<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;







Route::post('/logout',[AuthController::class,'logout'])->name('logout')->middleware('auth');

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