<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
      if ($request->user()->role === 'suspended') {
        return Inertia::render('dashboard/Dashboard', [
            'suspended' => true,
            'posts' => null,
        ]);
    }

    $posts = $request->user()->posts()->latest()->paginate(5);
    return Inertia::render('dashboard/Dashboard', [
        'suspended' => false,
        'posts' => $posts,
        'success'=>session('success')
    ]);
    }
}
