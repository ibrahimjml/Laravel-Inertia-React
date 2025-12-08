<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
   public function toggle(Request $request,User $user)
   {
       $follower = Auth::user();
  if ($follower->id === $user->id) {
    return response()->json(['error' => 'You cannot follow yourself.'], 400);
}
  if ($follower->isFollowing($user)) {
      $follower->followings()->detach($user->id);

  } else {
      $follower->followings()->attach($user->id);
return back();
   }
}
}