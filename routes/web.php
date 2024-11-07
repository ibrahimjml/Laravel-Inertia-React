<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;







Route::post('/logout',[AuthController::class,'logout'])->name('logout')->middleware('auth');

Route::get('/email/verify', [AuthController::class,'verify_notice'])
->middleware('auth')
->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', [AuthController::class,'verify_email'])
->middleware(['auth', 'signed'])
->name('verification.verify');

Route::post('/email/verification-notification', [AuthController::class,'verify_notification'])
->middleware(['auth', 'throttle:6,1'])
->name('verification.send');

Route::middleware('guest')->group(function(){
  Route::inertia('/register','auth/Register')->name('register');
  Route::post('/register',[AuthController::class,'register']);
  Route::inertia('/login','auth/Login')->name('login');
  Route::post('/login',[AuthController::class,'login']);
});

Route::get('/',[PostController::class,'index'])->name('home');
Route::resource('posts', PostController::class)->except('index','update');
Route::post('/update/{post}',[PostController::class,'update']);
Route::inertia('/about','About')->name('about') ;