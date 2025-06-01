<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\CommentReport;
use App\Models\Post;
use App\Models\PostReport;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rules\Enum;
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
        ->paginate(5)
        ->withQueryString();

      $users->getCollection()->transform(function ($user) {
       $user->append('role_label');
       return $user;
      });
        return Inertia::render('Admin/Userspage',
        ['users'=>$users,
        'roles'=> UserRole::values(),
        'status'=>session('status'),
        'filters'=>$request->only(['search','suspended'])
      ]);
      }else{
        abort(403);
      }
   }
    public function updaterole(Request $request,User $user)
   {
     Gate::authorize('updateRole', $user);
    $request->validate([
        'role' => ['required', new Enum(UserRole::class)],
    ]);

    $user->update(['role'=>$request->role]);

    return redirect()->back()->with('status', "User role {$request->role} updated successfully.");
  }

public function show(User $user,Request $request)
{

  $posts = $user->posts()
  ->withCount('comments')
  ->withSum('likes','count')
  ->with(['comments','reports'=>function($q){
    $q->with('user:id,name,username');
  }])
  ->filter($request->only(['search','unapproved']))
  ->latest()
  ->paginate(6)
  ->withQueryString();
  
   $posts->getCollection()->transform(function ($post) {
    $post->reports->each->append('reason_label');
    return $post;
  });
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
    public function reports()
    {

      $reports = PostReport::with(['user', 'post'])->latest()->paginate(6);
        $reports->getCollection()->transform(function ($q) {
        $q->append('reason_label');
        return $q;
      });
      return Inertia::render('Admin/Postreportspage',[
        'reports'=> $reports
      ]);
      }
      public function delete_report(PostReport $report)
      {
       $report = PostReport::findOrFail($report->id);
       $report->delete();
       return redirect()->back()->with('status','report deleted !');
      }

      public function comment_reports()
      {
          $reports = CommentReport::with(['user', 'comment.post','comment.user'])->latest()->paginate(6);
        $reports->getCollection()->transform(function ($q) {
        $q->append('reason_label');
        return $q;
      });
      return Inertia::render('Admin/Commentreportpage',[
        'Commentreports'=> $reports
      ]);
      }
      public function delete_comment_report(CommentReport $report)
      {
         $report = CommentReport::find($report->id);
       $report->delete();
       return redirect()->back()->with('status','report deleted !');
      }
}
