<?php

namespace App\Http\Controllers;


use App\Models\Post;
use Illuminate\Database\Eloquent\Builder; 
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;


class PostController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
      return [
        new Middleware('auth')
      ];
    }

  public function index()
  {
$post = Post::with('user')->orderBy('created_at','DESC')->paginate(6);
    return Inertia::render(
      'Home',
      ['posts' => $post]
    );
  }

public function create( )
{

  return Inertia::render("Create",

  );
}



  public function store(Request $request)
  {


    $fields = $request->validate([
      'title' => 'required|string|max:50',
      'description' => 'required|string',
      'tags' => 'nullable|string',
      'image' => 'nullable|mimes:jpg,png,jpeg|max:5000000',

    ]);


    if ($request->hasFile('image')) {
      $imageFile = $request->file('image');
      $imageName = uniqid() . '.' . $imageFile->extension();


      $imageFile->move(public_path('images'), $imageName);

      $fields['image'] =  $imageName;
    }
    $fields['tags'] = implode(',', array_map('trim', explode(',', $request->tags)));

    $request->user()->posts()->create($fields);
    return to_route('home')->with('success', 'posst created');
  }

  public function show(Post $post) 
  {
  
      return Inertia::render('Show',
      ['posts'=>$post,
      'canmodify'=>Auth::user()? Auth::user()->can('modify',$post) : false
      ]
    );
    
    
  }



  public function edit(Post $post) {
  Gate::authorize('modify',$post);
    return Inertia::render("Edit",
    ['posts'=>$post]
  );
  }


  public function update(Request $request, Post $post)
   {
    Gate::authorize('modify',$post);

    $fields = $request->validate([
      'title' => 'required|string|max:50',
      'description' => 'required|string',
      'tags' => 'nullable|string',
      'image' => 'nullable|mimes:jpg,png,jpeg|max:5000', 
  ]);


  if ($request->hasFile('image')) {
      $imageFile = $request->file('image');
      $imageName = uniqid() . '.' . $imageFile->extension();
      $imageFile->move(public_path('images'), $imageName);
      $fields['image'] = $imageName;
  }else {

    $fields['image'] = $post->image;
}
    $fields['tags'] = implode(',', array_map('trim', explode(',', $request->tags)));

    $post->update($fields);
    return to_route('home')->with('success', 'posst updated');
   }


  public function destroy(Post $post) 
  {
  Gate::authorize('modify',$post);

    if ($post->image) {
      $imagePath = public_path('images/' . $post->image);
      if (file_exists($imagePath)) {
          unlink($imagePath);  
      } 
    }
    $post->delete();
    return to_route('home')->with('success','post deleted');
  }
}
