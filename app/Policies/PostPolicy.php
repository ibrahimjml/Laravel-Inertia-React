<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Post;
use App\Models\User;


class PostPolicy
{
   public function before(User $user, string $ability): ?bool
    {
        if ($user->role === UserRole::Admin) {
            return true;
        }

        return null; 
    }

  public function view(?User $user, Post $post): bool
    {
         return $post->user->role !== UserRole::Suspended && $post->approved;
    }

    public function create(User $user): bool
    {
        return $user->role !== UserRole::Suspended;
    }

    public function modify(User $user, Post $post): bool
    {
      if ($user->role === UserRole::Moderator) {
        
        return $post->user->role !== UserRole::Admin;
      }
      return $user->id === $post->user_id;
    }
    public function report(User $user, Post $post): bool
    {
      return $post->user_id !== $user->id;
    }
}
