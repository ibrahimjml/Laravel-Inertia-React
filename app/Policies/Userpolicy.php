<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class Userpolicy
{
    public function modify(User $user, User $model): bool
    {
      return $user->role === 'admin' && $user->id !== $model->id; 
    }
}
