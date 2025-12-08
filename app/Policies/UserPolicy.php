<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
     public function updateRole(User $user): bool
    {
        return $user->role === UserRole::Admin;
    }
    public function modify(User $user): bool
    {
      return $user->role === UserRole::Admin; 
    }
}
