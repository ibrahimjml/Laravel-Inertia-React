<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;

class UserController extends Controller
{
    public function create(Request $request)
    {
      Gate::authorize("modify", User::class);
      $fields = $request->validate([
         'username'=>'required|string|alpha_num|min:5|max:13|unique:users',
         'name'=>'required|string|alpha|min:6|max:15',
         'email'=>'required|string|email|unique:users',
         'password'=>'required|string|confirmed',
         'role' => ['required','string',new Enum(UserRole::class)],
      ]);
         $fields['password'] = Hash::make($fields['password']);
         
         User::create($fields);
         return back()->with('success','user created');
    }
    public function update(Request $request, User $user)
    {
        Gate::authorize("modify", User::class);
       $request->validate([
         'username'=>'required|string|alpha_num|min:5|max:13|unique:users,username,'.$user->id,
         'name'=>'required|string|alpha|min:6|max:15',
         'email'=>'required|string|email|unique:users,email,'.$user->id,
         'role' => ['required','string',new Enum(UserRole::class)],
      ]);
        $user = User::find($user->id);
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->save();
        return back()->with('success','user updated');
    }
    public function delete(Request $request, User $user)
    {
        Gate::authorize("modify", User::class);
      User::destroy($user->id);
      return back()->with('success','user deleted');
    }
}
