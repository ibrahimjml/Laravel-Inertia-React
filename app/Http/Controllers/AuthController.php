<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

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
        event(new Registered($user));
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

    public function verify_notice()
    {
      return Inertia::render('auth/Verifyemail',['message'=>session('message')]);
    }

    public function verify_email(EmailVerificationRequest $request)
    {
      $request->fulfill();
      return to_route('home');
    }
    public function verify_notification(Request $request) 
    {
      $request->user()->sendEmailVerificationNotification();
    
      return back()->with('message', 'Verification link sent!');
    }

    public function index()
    {
      return Inertia::render('auth/Confirmpassword');
    }

    public function confirm(Request $request)
    {
      
        if (! Hash::check($request->password, $request->user()->password)) {
            return back()->withErrors([
                'password' => ['The provided password does not match our records.']
            ]);
        }
     
        $request->session()->passwordConfirmed();
     
        return redirect()->intended();
      }
}
