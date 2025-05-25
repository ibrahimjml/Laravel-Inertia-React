<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LikeController extends Controller
{
    const CACHE_DURATION = 5; // in minutes
    const MAX_LIKES_PER_USER = 10;

    public function like(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'id' => 'required|integer',
            'count' => 'sometimes|integer|min:1|max:10'
        ]);

        $user = Auth::user();
        $model = $this->resolveLikeable($request->type, $request->id);
        $cacheKey = $this->getCacheKey($model);

        return DB::transaction(function () use ($user, $model, $cacheKey) {
            $like = Like::firstOrCreate([
                'user_id' => $user->id,
                'likeable_id' => $model->id,
                'likeable_type' => get_class($model),
            ], [
                'count' => 1
            ]);

            if (!$like->wasRecentlyCreated && $like->count < self::MAX_LIKES_PER_USER) {
                $like->increment('count');
            }

            Cache::forget($cacheKey);

            return response()->json([
                'totalLikes' => $this->getCachedTotalLikes($model),
                'userLikes' => $like->count
            ]);
        });
    }

    public function undo(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'id' => 'required|integer',
        ]);

        $user = Auth::user();
        $model = $this->resolveLikeable($request->type, $request->id);
        $cacheKey = $this->getCacheKey($model);

        Like::where([
            'user_id' => $user->id,
            'likeable_id' => $model->id,
            'likeable_type' => get_class($model),
        ])->delete();

        Cache::forget($cacheKey);

        return response()->json([
            'totalLikes' => $this->getCachedTotalLikes($model),
            'userLikes' => 0
        ]);
    }

    private function getCachedTotalLikes($model)
    {
        $cacheKey = $this->getCacheKey($model);
        return Cache::remember($cacheKey, self::CACHE_DURATION * 60, function () use ($model) {
            return $model->likes()->sum('count');
        });
    }

    private function getCacheKey($model): string
    {
        return 'likeable_' . strtolower(class_basename($model)) . "_{$model->id}_likes";
    }

    private function resolveLikeable($type, $id)
    {
        return match(strtolower($type)) {
            'post' => Post::findOrFail($id),
            default => abort(404, 'Invalid likeable type.'),
        };
    }
}
