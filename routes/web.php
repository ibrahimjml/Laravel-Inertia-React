<?php

use App\Http\Controllers\{
       CommentReportController,
       DashboardController,
       FollowController,
       LikeController,
       PostController,
       ProfileController,
       PostReportController,
       CommentController
};
use App\Http\Controllers\Admin\{
    AdminController,
    TagController,
    UserController,
};
use Illuminate\Support\Facades\Route;

// posts routes
Route::get('/',[PostController::class,'index'])->name('home');
Route::resource('posts', PostController::class)->except('destroy');
Route::post('/posts/{post}/delete', [PostController::class, 'destroy'])
    ->name('posts.destroy');

  // user routes
  Route::middleware('auth')->group(function(){
  Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');

  // prodile edit
  Route::get('/editprofile',[ProfileController::class,'index'])
  ->middleware('password.confirm')
  ->name('edit.profile');
  Route::post('/editprofile',[ProfileController::class,'update'])->name('update.profile');
  Route::post('/editprofile',[ProfileController::class,'password'])->name('update.password');
  Route::post('/editprofile',[ProfileController::class,'delete'])->name('delete.account');
  // likes
  Route::post('/like', [LikeController::class, 'like'])->name('like');
  Route::post('/undo-like', [LikeController::class, 'undo'])->name('undo.like');
  // follow
  Route::post('/togglefollow/{user}',[FollowController::class,'toggle'])->name('togglefollow');
  // post report
  Route::post('/post-report/{post}', [PostReportController::class, 'store'])->name('post.report');
 // Comments
  Route::post('/comment/{post}',[CommentController::class,'store'])->name('comment.create');
  Route::put('/comment/{comment}/edit',[CommentController::class,'update'])->name('comment.update');
  Route::post('/comment/{comment}/delete',[CommentController::class,'delete'])->name('comment.delete');
  Route::post('/comments/{comment}/like', [LikeController::class, 'like'])->name('comments.likes');
  Route::post('/comments/{comment}/undo', [LikeController::class, 'undo'])->name('comments.undo');
  Route::post('/comment/{comment}/report', [CommentReportController::class, 'report'])->name('comment.report');
});

// admin routes
Route::middleware(['auth','verified','can:makeAdminActions'])
->group(function(){
  Route::controller(AdminController::class)->group(function(){
  Route::get('/admin','index')->name('admin.page');
  Route::get('/admin/users','users')->name('users.page');
  Route::get('/show/{user}','show')->name('show.posts');
  Route::get('/admin/posts-reports','reports')->name('posts.reports');
  Route::get('/admin/comments-reports','comment_reports')->name('comments.reports');
  Route::put('/admin/{user}/role','updaterole')->name('user.updaterole');
  Route::post('/posts/{post}/approve','approve')->name('approve.update');
  Route::delete('/admin/post-user/{post}','delete')->name('post.delete');
  Route::delete('/admin/delete-report/{report}','delete_report')->name('delete.report');
  Route::delete('/admin/delete-comment/{report}','delete_comment_report')->name('delete.comment.report');
  });
  Route::controller(TagController::class)->group(function(){
  Route::get('/admin/tags','tags')->name('tags.page');
  Route::get('/admin/posts-tag/{hashtag}','show')->name('tags.posts');
  Route::post('/admin/add-tag','create')->name('tag.create');
  Route::patch('/admin/edit-tag/{hashtag}','edit')->name('tag.edit');
  Route::delete('/admin/delete-tag/{hashtag}','destroy')->name('tag.delete');
  });
  Route::post('/admin/user/create',[UserController::class,'create'])->name('user.create');
  Route::put('/admin/update/{user}',[UserController::class,'update'])->name('user.update');
  Route::delete('/admin/update/{user}',[UserController::class,'delete'])->name('user.delete');
});


// auth routes
require __DIR__."/auth.php";