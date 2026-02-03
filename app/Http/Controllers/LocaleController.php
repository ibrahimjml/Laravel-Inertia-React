<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocaleController extends Controller
{
  public function __invoke()
  {
    $newLocale = request()->locale;
    session(['locale' => $newLocale]);
    
    $previous = url()->previous();
    $path = parse_url($previous, PHP_URL_PATH);

    $segments = explode('/', trim($path, '/'));

    if (array_key_exists($segments[0], config('languages'))) {
      $segments[0] = $newLocale;
    } else {
      array_unshift($segments, $newLocale);
    }
    $url = '/' . implode('/', $segments);

    return redirect($url);
  }
}
