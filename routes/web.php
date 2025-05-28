<?php

use App\Http\Controllers\{
       DashboardController,
       FollowController,
       LikeController,
       PostController,
       ProfileController
};
use App\Http\Controllers\Admin\{
  AdminController,
  TagController,
};
use App\Http\Controllers\Admin\PostReportController;
use Illuminate\Support\Facades\Route;

// posts routes
Route::get('/',[PostController::class,'index'])->name('home');
Route::resource('posts', PostController::class);

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
  // likes
  Route::post('/like', [LikeController::class, 'like'])->name('like');
  Route::post('/undo-like', [LikeController::class, 'undo'])->name('undo.like');
  // follow
  Route::post('/togglefollow/{user}',[FollowController::class,'toggle'])->name('togglefollow');
  // post report
  Route::post('/post-report', [PostReportController::class, 'store'])->name('post.report');
});

// admin routes
Route::middleware(['auth','verified','can:makeAdminActions'])
->group(function(){
  Route::controller(AdminController::class)->group(function(){
  Route::get('/admin','index')->name('admin.page');
  Route::get('/admin/users','users')->name('users.page');
  Route::get('/show/{user}','show')->name('show.posts');
  Route::put('/admin/{user}/role','updaterole')->name('user.updaterole');
  Route::put('/approve/post{post}','approve')->name('approve.update');
  Route::delete('/admin/post-user/{post}','delete')->name('post.delete');
  });
  Route::controller(TagController::class)->group(function(){
  Route::get('/admin/tags','tags')->name('tags.page');
  Route::get('/admin/posts-tag/{hashtag}','show')->name('tags.posts');
  Route::post('/admin/add-tag','create')->name('tag.create');
  Route::patch('/admin/edit-tag/{hashtag}','edit')->name('tag.edit');
  Route::delete('/admin/delete-tag/{hashtag}','destroy')->name('tag.delete');
  });
});



// auth routes
require __DIR__."/auth.php";