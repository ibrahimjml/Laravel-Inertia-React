<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CommentPolicy
{
    public function create(User $user): bool
    {
        return $user->role !== UserRole::Suspended;
    }
    public function modify(User $user,Comment $comment): bool
    {
      
      return $user->role === UserRole::Admin || $user->id === $comment->user_id;
    }

    public function report(User $user, Comment $comment): bool
    {
      return $comment->user_id !== $user->id;
    }
}
