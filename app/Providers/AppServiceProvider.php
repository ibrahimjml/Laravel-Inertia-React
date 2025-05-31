<?php

namespace App\Providers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\PostReport;
use App\Observers\CommentObserver;
use App\Observers\PostObserver;
use App\Observers\ReportObserver;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

    Relation::morphMap([
      'App\Models\Post' => Post::class,
     ]);

      Post::observe(PostObserver::class);
      PostReport::observe(ReportObserver::class);
      Comment::observe(CommentObserver::class);
      
      Gate::define("makeAdminActions", function ($user) {
        return $user->email === "admin@mail.ru" || $user->role === 'admin';
    });
    }
}
