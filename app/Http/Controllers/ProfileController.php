<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
      return Inertia::render('Profile/Edit',['user'=>$request->user()]);
    }

    public function update(Request $request)
    {
      $fields = $request->validate([
        'username'=>['required','string','alpha_num','min:5','max:13',Rule::unique(User::class)->ignore($request->user()->id)],
         'name'=>'required|string|alpha|min:6|max:15',
         'email'=>['required','email',Rule::unique(User::class)->ignore($request->user()->id)]
      ]);
      $request->user()->fill($fields);
      if ($request->user()->isDirty('email')) {
        $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    return redirect()->route('edit.profile');
    }

    public function password(Request $request)
    {
      $fileds = $request->validate([
        'current_password'=>'required|current_password',
        'password'=>'required|min:8|confirmed'
      ]);
      $request->user()->update([
        'password'=>Hash::make($fileds['password'])
      ]);
      return redirect()->route('edit.profile');
    }

    public function delete(Request $request){
       $request->validate([
        'current_password'=>'required|current_password',
      ]);
      $user = $request->user();
        Auth::logout();
      $user->delete();
        return to_route('login');
    }
}
