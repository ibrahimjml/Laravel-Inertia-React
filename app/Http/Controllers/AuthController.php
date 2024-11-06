<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $credantials = $request->validate([
         'username'=>'required|string|alpha_num|min:5|max:13|unique:users',
         'name'=>'required|string|alpha|min:6|max:15',
         'email'=>'required|string|email|unique:users',
         'password'=>'required|string|confirmed',
        ]);
        $user = User::create($credantials);
        Auth::login($user);
        return to_route('home');
    }

    public function login(Request $request)
    {
         $credantials = $request->validate([
          'email'=>'required|email',
          'password'=>'required'
         ]);
         if(Auth::attempt($credantials)){
          $request->session()->regenerate();
          return to_route('home')->with('success','logged in successfuly');
         }
         return back()->withErrors([
          'email'=>'Credentials do not match records'
         ])->onlyInput('email');
    }

    public function logout(){
      Auth::logout();
      return to_route('login');
    }
}
