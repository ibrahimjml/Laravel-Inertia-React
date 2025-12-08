<?php

namespace App\Http\Controllers;

use App\Http\Middleware\Suspended;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CommentController extends Controller implements HasMiddleware
{
  public static function middleware()
    {
      return [
        new Middleware(['auth','verified',Suspended::class])
      ];
    }
    public function store(Post $post,Request $request)
    {
        $fields = $request->validate([
        'content'=>'required|string|max:255',
        'parent_id'=>'nullable|exists:comments,id'
      ]);

      $post->comments()->create([
        'user_id' => Auth::id(),
        'post_id' => $post->id,
        'content' => strip_tags($fields['content']),
        'parent_id' => $fields['parent_id'] ?? null,
    ]);

    $message = $request->filled('parent_id') ? 'Reply created' : 'Comment created';

      return back()->with('success', $message);
    }

    public function update(Request $request, Comment $comment)
   {
    Gate::authorize('modify', $comment);
    
    $fields = $request->validate([
        'content' => 'required|string|max:1000',
    ]);
    $comment->content = $fields['content'];
  if (!$comment->isDirty('content')) {
    return back()->withErrors([
        'content' => 'Nothing changed to update',
    ]);
}
    $comment->save();

    return back()->with('success', 'Comment updated.');
    }
    public function delete(Comment $comment)
    {
    Gate::authorize('modify',$comment);

     $comment->delete();

    return back()->with('success', 'Comment deleted.');
    }
}
