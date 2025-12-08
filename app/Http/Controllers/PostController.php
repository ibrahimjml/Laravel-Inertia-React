<?php

namespace App\Http\Controllers;

use App\Enums\ReportReason;
use App\Enums\UserRole;
use App\Http\Middleware\Suspended;
use App\Http\Requests\PostRequest;
use App\Models\Hashtag;
use App\Models\Post;
use App\Services\HashtagService;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Services\PostService;
use App\Services\SortPostService;
use App\Traits\ImageUpload;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PostController extends Controller implements HasMiddleware
{
  use ImageUpload;
    public static function middleware()
    {
      return [
        (new Middleware(['auth','verified',Suspended::class]))->except('index')
      ];
    }

  public function index(Request $request,PostService $service,SortPostService $sort)
  {
         $auth = Auth::user();
         $sortOption = $request->get('sort','latest');

$posts = Post::whereHas('user',function(Builder $q){
               $q->where('role','!=','suspended');
             })
              ->with(['user', 'hashtags','comments', 'likes' => function ($q) {
               $q->with('user:id,name,username'); 
              }])
             ->withSum('likes', 'count')
             ->withCount('comments')
             ->where('approved',true)
             ->search($request->only(['search','tag','user']));

    $posts = $sort->sortPosts($posts,$sortOption, $auth);
    $post = $posts->paginate(6)->withQueryString();
   
   $post->getCollection()->transform(function ($post) use ($service) {
           return $service->transformPost($post); });

$userlikes = $post->getCollection()->mapWithKeys(function ($post) use ($service) {
  return [$post->id => $service->getLikersGrouped($post)];

});
    return Inertia::render(
      'Home',
      [
        'posts' => $post,
        'likers' => $userlikes,
      'filters'=>$request->only(['search','tag','user','sort'])
      ]
    );
  }

public function create( )
{
   Gate::authorize('create',Post::class);
  return Inertia::render("Create",[
    'alltags' => Hashtag::pluck('name')->toArray(),
  ]);
}
  public function store(PostRequest $request,HashtagService $tags)
  {
    Gate::authorize('create',Post::class);
    $fields = $request->validated();
    
    if($request->user()->role === UserRole::Admin) $fields['approved'] = true;
    
    if ($newImage = $this->handleImageUpload($request->file('image'))) {
        $fields['image'] = $newImage;
    }
 DB::transaction(function () use ( $fields, $tags,$request) {
  $post =  $request->user()->posts()->create($fields);
   Log::info('Post created', ['id' => $post->id,'title'=> $post->title, 'user_id' => Auth::id()]);
    if($request->filled('tags')){
       $tags->attachHashtags($post,$request->input('tags'));
    }
  });
    return to_route('dashboard')->with('success', 'posst created');
  }

  public function show(Post $post,PostService $service,Request $request) 
  {
     Gate::authorize('view',$post);
    $post->load(['user.followers','likes.user','hashtags']);
    $post->loadCount('comments');
    $post->loadSum('likes', 'count');

     $post = $service->transformPost($post);
     $likers = $service->getLikersGrouped($post);
    
     $alltags = $post->hashtags()->pluck('name')->toArray();
     $reasons = collect(ReportReason::cases())->map(function ($case) {
        return [ 'name' => $case->name, 'value' => $case->value ];});
        
     $morearticles = Post::query()
           ->with(['user'=> function ($query){
             $query->select('id','name','username');
           }])
          ->where('user_id',$post->user_id)
          ->where('id','!=',$post->id)
          ->take(3)
          ->get()
          ->map(function ($p) use ($service) {
        return $service->transformPost($p);
          });
    $sort = $request->query('sort', 'New');    
    $Comments = $service->getComments($post,$sort);

      return Inertia::render('Show',
      ['posts'=>$post,
      'tags'=>$alltags,
      'likers' => $likers,
      'morearticles' => $morearticles,
      'reportReasons' => $reasons,
      'comments' => $Comments,
      'sort'=>$sort,
      'canmodify'=>Auth::user()? Auth::user()->can('modify',$post) : false,
      'canreport'=>Auth::user()? Auth::user()->can('report',$post) : false,
      ]);  
  }
  public function edit(Post $post) {
  Gate::authorize('modify',$post);
  $tags = $post->hashtags()->pluck('name')->toArray();
  $alltags = Hashtag::pluck('name')->toArray();
    return Inertia::render("Edit",
    ['posts'=>$post,'tags'=>$tags,'alltags'=>$alltags]
  );
  }


  public function update(PostRequest $request,Post $post,HashtagService $service)
   {
    Gate::authorize('modify',$post);

    $fields = $request->validated();

    $tags = $fields['tags'] ?? [];
    unset($fields['tags']);

    $imageName = $this->handleImageUpload($request->file('image'));
    if ($imageName) {
            $fields['image'] = $imageName;
        } else {
            unset($fields['image']);
        }

    $post->fill($fields);
    $currentTags = $post->hashtags->pluck('name')->sort()->values()->toArray();
    $newTags = collect($tags)->sort()->values()->toArray();
    $tagsChanged = $currentTags !== $newTags;

    if(!$post->isDirty() && !$tagsChanged) {
      return redirect('/posts/'.$post->id.'/edit')->with('status', 'Nothing changed to update');
    }
     DB::transaction(function () use ($post, $fields, $service,$tags) {    
    $post->update($fields);
    $service->syncHashtags($post, $tags);

     Log::info('Post updated', [
        'id' => $post->id,
        'title'=> $post->title,
        'user_id' => Auth::id()
    ]);
  });
    return to_route('dashboard')->with('success', 'post updated');
   }

  public function destroy(Post $post) 
  {
  Gate::authorize('modify',$post);
 DB::transaction(function () use ($post) {
    $post->delete();
  Log::info('Post deleted', ['id' => $post->id,'title'=> $post->title, 'user_id' => Auth::id()]);
 });
    return to_route('dashboard')->with('success','post deleted');
  }
  
}
