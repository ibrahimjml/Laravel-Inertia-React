<?php

namespace App\Providers;

use App\Enums\UserRole;
use App\Models\Comment;
use App\Models\CommentReport;
use App\Models\Post;
use App\Models\PostReport;
use App\Observers\CommentObserver;
use App\Observers\CommentReportObserver;
use App\Observers\PostObserver;
use App\Observers\PostReportObserver;
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
      PostReport::observe(postReportObserver::class);
      Comment::observe(CommentObserver::class);
      CommentReport::observe(CommentReportObserver::class);
      
      Gate::define("makeAdminActions", function ($user) {
        return in_array($user->role,[UserRole::Admin,UserRole::Moderator], true);
    });
    }
}
