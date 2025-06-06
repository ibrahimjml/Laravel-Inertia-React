<?php

namespace App\Http\Middleware;

use App\Models\User;
use Dom\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
          'auth.user' => fn () => $request->user()
                 ? array_merge($request->user()->only('id', 'name', 'email', 'role'),
               [ 'can' => [
                'access' => Gate::check('makeAdminActions'),
                'modifyusers' => $request->user()->can('modify', User::class),
                 ]
                ]
                ): null,
            'flash' => [
            'status' => fn () => $request->session()->get('status'),
            'success' => fn () => $request->session()->get('success'),
            'error' => fn () => $request->session()->get('error'),
            ],
            'csrf' => fn () => csrf_token(),
        ]);
    }
}
