<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
    

      if(Gate::allows('makeAdminActions')){
        $user = User::with('posts')
        ->search($request->only(['search','suspended']))
        ->paginate(5)
        ->withQueryString();

        return Inertia::render('admin/Adminpage',
        ['users'=>$user,
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
  ->filter($request->only(['search','unapproved']))
  ->latest()
  ->paginate(6)
  ->withQueryString();

  return Inertia::render('admin/Userposts',
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
}
