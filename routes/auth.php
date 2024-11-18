<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')
->controller(AuthController::class)
->group(function(){

  Route::post('/logout','logout')->name('logout');
  // Email verification
  Route::get('/email/verify', 'verify_notice')
  ->name('verification.notice');
  Route::get('/email/verify/{id}/{hash}','verify_email')
  ->middleware('signed')
  ->name('verification.verify');
  Route::post('/email/verification-notification', 'verify_notification')
  ->middleware('throttle:6,1')
  ->name('verification.send');
  // Confirmation password
  Route::get('/confirm-password','index')->name('password.confirm');
  Route::post('/confirm-password', 'confirm')->middleware('throttle:6,1')->name('confirm.password');
});


Route::middleware('guest')
->controller(AuthController::class)
->group(function(){
  // Register
  Route::inertia('/register','auth/Register')->name('register');
  Route::post('/register','register');
  // Login
  Route::get('/login','loginpage')->name('login');
  Route::post('/login','login');

    //Forget password
    Route::get('/forgotpassword','forgotpage')->name('forgot.password');
    Route::post('/forgotpassword','forgotpass')->name('forgot.password.post');
    //Reset password
    Route::get('/reset/{token}','reset')->name('reset.password');
    Route::post('/reset/{token}','reset_pass')->name('reset.password.post');
});