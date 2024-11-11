<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
  public function admin(User $user)
    {
        if ($user->role === 'admin') {
            return true;
        }

        return null;
    }

  public function view(?User $user, Post $post): bool
    {
        return $post->user->role !== 'suspended' && $post->approved;
    }

    public function create(User $user): bool
    {
        return $user->role !== 'suspended';
    }

    public function modify(User $user, Post $post): bool
    {
      if($user->role === 'admin'){
        return true;
      }
      return $user->id === $post->user_id;
    }
}
