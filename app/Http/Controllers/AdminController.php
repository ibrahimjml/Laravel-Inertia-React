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
        ->search(request(['search']))
        ->paginate(5)
        ->withQueryString();

        return Inertia::render('admin/Adminpage',
        ['users'=>$user,
        'status'=>session('status'),
        'requestsearch'=>$request->search
      ]);
      }else{
        abort(403);
      }
  
    }

    public function updaterole(Request $request,User $user)
{
    $request->validate([
        'role' => 'required|in:admin,subscriber,suspended',
    ]);

    $user->role = $request->input('role');
    $user->save();

    return redirect()->back()->with('status', 'User role updated successfully.');
}

public function show(User $user,Request $request)
{
  
  $posts = $user->posts()
  ->filter(request(['search']))
  ->latest()
  ->paginate(6)
  ->withQueryString();

  return Inertia::render('admin/Userposts',
  ['user'=>$user,
  'posts'=>$posts,
  'requestsearch'=>$request->search
]);
}
    public function approve(Post $post)
    {
      $post->update(['approved'=>!$post->approved]);
      return redirect()->back()->with('status', 'User role updated successfully.');
    }
}
