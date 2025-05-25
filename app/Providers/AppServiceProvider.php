<?php

namespace App\Providers;

use App\Models\Post;
use App\Observers\PostObserver;
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
      
      Gate::define("makeAdminActions", function ($user) {
        return ($user->email === "admin@mail.ru" || $user->role === 'admin');
    });
    }
}
