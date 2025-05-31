<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Facades\Auth ;
use Illuminate\Support\Facades\DB;

class PostService
{
  public function transformPost(Post $post)
    {
        $auth = Auth::user();
        $post->user_like = $post->likes->where('user_id', $auth?->id)->sum('count');
        $post->user->is_followed = $auth?->isFollowing($post->user);;

        return $post;
    }

    public function getLikersGrouped($post)
    {
        return $post->likes
            ->groupBy('user_id')
            ->map(function ($likes) {
                $user = $likes->first()->user;
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'count' => $likes->sum('count'),
                ];
            })
            ->values();
    }
    public function getComments(Post $post,$sort = 'New')
    {
    $comments = $post->comments()
                ->with([
                    'user',
                    'likes' => fn($q) => $q->where('user_id', Auth::id())
                ])
                ->withCount([
                    'likes as likes_sum_count' => fn($q) => $q->select(DB::raw('SUM(count)'))
                ]);
               if ($sort === 'Top') {
                  $comments->orderByDesc('likes_sum_count');
               } else {
                 $comments->latest();
               }
              $comments = $comments->get()->map(function ($comment) {
                    $comment->user_like_count = $comment->likes->first()?->count ?? 0;
                    $comment->can_modify = Auth::user()?->can('modify', $comment);
                    return $comment;
                });

    return $this->nestedComments($comments);
    }
private function nestedComments($comments)
  {
    $grouped = $comments->groupBy('parent_id');

    foreach ($comments as $comment) {
        $comment->replies = $grouped[$comment->id] ?? collect();
    }

    return $grouped[null] ?? collect(); 
  }
}