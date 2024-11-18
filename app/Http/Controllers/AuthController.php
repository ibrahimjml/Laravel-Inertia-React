<?php

namespace App\Http\Controllers;

use App\Mail\ForgotPassword;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Mail;

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
    
    public function loginpage()
    {
      return Inertia::render('auth/Login',['success'=>session('success')]);
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

      public function forgotpage()
      {
         return Inertia::render('auth/Forgetpassword',['success'=>session('status'),'error'=>session('error')]);
      }

      public function forgotpass(Request $request)
      {
        $fields = $request->validate([
          "email" => ["required", "email", "min:5", "max:50"],
        ]);
    
        $user = User::where('email', '=', $fields['email'])->first();
        if (!empty($user)) {
    
          $token = Str::random(40);
          DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email,
            'token' => $token,
            'created_at' => now()]
          );
          $user->save();
          Mail::to($user->email)->send(new ForgotPassword($user, $token));
          return back()->with('status', 'please check your email');
        } else {
          return back()->with('status', 'sorry,email not found ');
        }
      }

      public function reset($token)
      {
        $resetToken = DB::table('password_reset_tokens')->where('token', $token)->first();
    if ($resetToken) {
      $user = User::where('email', $resetToken->email)->first();
      if (!empty($user)) {
      
        return Inertia::render('auth/Resetpass',['token' => $token]);
      }
    } else {
      abort(404);
    }
      }

      public function reset_pass(Request $request,$token)
      {
        
        $resetToken = DB::table('password_reset_tokens')->where('token', $token)->first();

        if ($resetToken) {
          $user = User::where('email', $resetToken->email)->first();
          if (!empty($user)) {
            $fields = $request->validate([
              "password" => ["required","min:8", "max:32", "confirmed"],
            ]);
    
            $user->password = bcrypt($fields['password']);
    
            $user->save();
            DB::table('password_reset_tokens')->where('token', $token)->delete();
            return redirect()->route('login')->with('success', 'password reset success');
          }
        } else {
    
          abort(404);
        }
      }
}
