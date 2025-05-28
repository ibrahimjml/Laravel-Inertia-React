<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
    return Inertia::render("Admin/Adminpage");
    }
   public function users(Request $request)
   {
     if(Gate::allows('makeAdminActions')){
        $users = User::with('posts')
        ->withCount(['followers','followings'])
        ->search($request->only(['search','suspended']))
        ->isSubscriber()
        ->paginate(5)
        ->withQueryString();
  
        return Inertia::render('Admin/Userspage',
        ['users'=>$users,
        'status'=>session('status'),
        'filters'=>$request->only(['search','suspended'])
      ]);
      }else{
        abort(403);
      }
   }
    public function updaterole(Request $request,User $user)
{

    $request->validate([
        'role' => 'required|string|in:admin,subscriber,suspended',
    ]);

    $user->update(['role'=>$request->role]);

    return redirect()->back()->with('status', "User role {$request->role} updated successfully.");
}

public function show(User $user,Request $request)
{

  $posts = $user->posts()
  ->withSum('likes','count')
  ->filter($request->only(['search','unapproved']))
  ->latest()
  ->paginate(6)
  ->withQueryString();

  return Inertia::render('Admin/Userposts',
  ['user'=>$user,
  'posts'=>$posts,
  'filters'=>$request->only(['search','unapproved'])
]);
}
    public function approve(Post $post)
    {
      $post->update(['approved'=>!$post->approved]);
      return redirect()->back()->with('status', 'User role updated successfully.');
    }
    public function delete(Post $post)
    {
      $post = Post::find($post->id);
      $post->delete();
      return redirect()->back()->with('status','post deleted successfully');
    }
}
