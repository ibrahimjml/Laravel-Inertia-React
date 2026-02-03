<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocaleMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    $locale = $request->segment(1)
      ?? session('locale')
      ?? substr($request->server('HTTP_ACCEPT_LANGUAGE'), 0, 2)
      ?? config('app.locale');

    if (!array_key_exists($locale, config('languages'))) {
      $segments = $request->segments();
      if (isset($segments[0])) {
        $segments[0] = config('app.locale');
      }
      $url = '/' . implode('/', $segments);
      return redirect($url);
    }

    app()->setLocale($locale);
    session(['locale' => $locale]);
    URL::defaults(['locale' => $locale]);
    // ignore local parameter in controllers
    if ($request->route()) {
      $request->route()->forgetParameter('locale');
    }


    return $next($request);
  }
}
