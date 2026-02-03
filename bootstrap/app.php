<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
      $middleware->trustProxies('*');
      $middleware->web(append: [
        \App\Http\Middleware\SwitchLocaleMiddleware::class,
        HandleInertiaRequests::class,
    ]);
    $middleware->alias([
      'setlocale' => App\Http\Middleware\SetLocaleMiddleware::class,
      'suspended' => App\Http\Middleware\Suspended::class,
    ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
          $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\HttpException $e) {
        if ($e->getStatusCode() === 403) {
            return Inertia::location(route('dashboard'));
        }
    });
    })->create();
