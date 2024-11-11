<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function(){
  Route::post('/logout',[AuthController::class,'logout'])->name('logout');

  Route::get('/email/verify', [AuthController::class,'verify_notice'])
  ->name('verification.notice');
  
  Route::get('/email/verify/{id}/{hash}', [AuthController::class,'verify_email'])
  ->middleware('signed')
  ->name('verification.verify');
  
  Route::post('/email/verification-notification', [AuthController::class,'verify_notification'])
  ->middleware('throttle:6,1')
  ->name('verification.send');
  Route::get('/confirm-password',[AuthController::class,'index'])->name('password.confirm');
  Route::post('/confirm-password', [AuthController::class,'confirm'])->middleware('throttle:6,1')->name('confirm.password');
});


Route::middleware('guest')->group(function(){
  Route::inertia('/register','auth/Register')->name('register');
  Route::post('/register',[AuthController::class,'register']);
  Route::inertia('/login','auth/Login')->name('login');
  Route::post('/login',[AuthController::class,'login']);
});