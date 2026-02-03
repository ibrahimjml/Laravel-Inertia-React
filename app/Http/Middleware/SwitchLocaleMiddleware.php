<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SwitchLocaleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = session()->get('locale',config('app.locale'));
        if(array_key_exists($locale, config('languages'))){
          app()->setLocale($locale);
        }else{
          app()->setLocale(config('app.locale'));
        }
        return $next($request);
    }
}
