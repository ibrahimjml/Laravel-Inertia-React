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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
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
    $this->bootEloquentMorphs();
    $this->bootEvent();
    $this->bootGates();
    $this->debugDB();
    URL::defaults(['locale' => app()->getLocale()]);
  }
  public function bootEloquentMorphs()
  {
    Relation::morphMap([
      Post::TABLE => Post::class,
      Comment::TABLE => Comment::class
    ]);
  }
  public function bootEvent()
  {
    Post::observe(PostObserver::class);
    PostReport::observe(postReportObserver::class);
    Comment::observe(CommentObserver::class);
    CommentReport::observe(CommentReportObserver::class);
  }
  public function bootGates()
  {
    Gate::define("makeAdminActions", function ($user) {
      return in_array($user->role, [UserRole::Admin, UserRole::Moderator], true);
    });
  }
  public function debugDB()
  {
    if (! $this->app->isProduction()) {
      DB::listen(function ($query) {
        Log::debug("SQL Query", [
          'sql' => $query->sql,
          'bindings' => $query->bindings,
          'time' => $query->time,
        ]);
      });
    }
  }
}
