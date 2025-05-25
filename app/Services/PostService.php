<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Facades\Auth ;

class PostService
{
  public function transformPost(Post $post)
    {
        $auth = Auth::user();

        // Add user_like and is_followed
        $post->user_like = $post->likes->where('user_id', $auth?->id)->sum('count');
        $post->user->is_followed = $auth && $post->user->followers->contains($auth->id);

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
}