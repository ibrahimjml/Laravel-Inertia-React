<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
      if ($request->user()->role->value === \App\Enums\UserRole::Suspended->value) {
        return Inertia::render('Dashboard/Dashboard', [
            'suspended' => true,
            'posts' => null,
            'error' => session('error'),
        ]);
    }

    $posts = $request->user()->posts()->latest()->paginate(5);
    return Inertia::render('Dashboard/Dashboard', [
        'suspended' => false,
        'posts' => $posts,
        'success' => session('success'),
        'error' => session('error'),
    ]);
    }
}
