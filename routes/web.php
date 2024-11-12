<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// posts routes
Route::get('/',[PostController::class,'index'])->name('home');
Route::resource('posts', PostController::class)->except('index','update');
Route::post('/update/{post}',[PostController::class,'update']);

  // user routes
  Route::middleware('auth')->group(function(){
  Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');

  // prodile edit
  Route::get('/editprofile',[ProfileController::class,'index'])
  ->middleware('password.confirm')
  ->name('edit.profile');
  Route::patch('/editprofile',[ProfileController::class,'update'])->name('update.profile');
  Route::put('/editprofile',[ProfileController::class,'password'])->name('update.password');
  Route::delete('/editprofile',[ProfileController::class,'delete'])->name('delete.account');
});

// admin routes
Route::middleware(['auth','verified','can:makeAdminActions'])
->controller(AdminController::class)
->group(function(){
  Route::get('/admin','index')->name('admin.page');
  Route::get('/show/{user}','show')->name('show.posts');
  Route::put('/admin/{user}/update-role','updaterole')->name('user.updaterole');
  Route::put('/approve/post{post}','approve')->name('approve.update');
});



// auth routes
require __DIR__."/auth.php";