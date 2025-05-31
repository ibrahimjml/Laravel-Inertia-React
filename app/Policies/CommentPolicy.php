<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CommentPolicy
{
    public function create(User $user): bool
    {
        return $user->role !== 'suspended';
    }
    public function modify(User $user,Comment $comment): bool
    {
        if($user->role === 'admin'){
        return true;
      }
      return $user->id === $comment->user_id;
    }

    
}
