<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hashtag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    public function tags(Request $request)
    {
      $sort = $request->get('sort','latest');

    $tags = Hashtag::with([
               'posts' => fn($q) =>
                $q->select('posts.id', 'posts.title', 'posts.image', 'posts.approved')
              ->take(5)
              ])
              ->withCount([
                  'posts', 
                  'posts as approved_posts_count' => fn($q) => $q->where('approved', true),
                  'posts as unapproved_posts_count' => fn($q) => $q->where('approved', false),
                  ])
             ->search(request()->only('tag'));
        switch ($sort) {
        case 'oldest':
            $tags->oldest();
            break;
            
        case 'popular':
         $tags->having('posts_count', '>', 2)
                     ->orderByDesc('posts_count');
                
        break;
        case 'latest':
        default:
            $tags->latest();
            break;
        }       
        $tags = $tags->paginate(6)->withQueryString();
      return Inertia::render('Admin/Tagspage',[
        'tags' => $tags,
        'filter' => request()->only('tag','sort')  ,       
      ]);
    }
    public function show(Hashtag $hashtag)
    {
      $relatedposts = $hashtag->posts()
      ->select('posts.id', 'posts.title', 'posts.image', 'posts.approved')
        ->get();
         return response()->json($relatedposts);
    }
    public function create(Request $request)
    {
      
         $fields = $request->validate([
          'name' =>'required|string'
          ]);
          Hashtag::create($fields);
          return back()->with('success',"tag  created !");
    }
    public function edit(Hashtag $hashtag,Request $request)
    {
        $hashtag = Hashtag::find($hashtag->id);
         $fields = $request->validate([
          'name' =>'required|string'
          ]);
          if(!$hashtag->isDirty('name')) {
            return back()->withErrors(['name'=>'nothing changed to update']);
          }
          $hashtag->update($fields);
          $hashtag->save();
          return back()->with('success',"tag {$hashtag->name} updated !");
    }
    public function destroy(Hashtag $hashtag)
    {      
           $hashtag = Hashtag::find($hashtag->id);
           $name = $hashtag->name;
           $hashtag->delete();
        return back()->with('success',"tag {$name} deleted !");
    }
}
