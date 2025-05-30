<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LikeController extends Controller
{
    const CACHE_DURATION = 5; // in minutes
    const MAX_LIKES_PER_USER = 30;

    public function like(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'id' => 'required|integer',
            'count' => 'required|integer|min:1|max:30'
        ]);

        $user = Auth::user();
        $model = $this->resolveLikeable($request->type, $request->id);
        $cacheKey = $this->getCacheKey($model);

        return DB::transaction(function () use ($user,$request, $model, $cacheKey) {
           $like = Like::firstOrCreate([
            'user_id' => $user->id,
            'likeable_id' => $model->id,
            'likeable_type' => get_class($model),
        ], ['count' => 0]);

        $newTotal = min($like->count + $request->count, self::MAX_LIKES_PER_USER);
        if($newTotal >= self::MAX_LIKES_PER_USER){
          Log::info('max likes hit for',[
            'user_id'=>Auth::id(),
            'likeable_type' => get_class($model),
           'likeable_id' => $model->id,
           'count' => $newTotal
          ]);
        }
         $like->count = $newTotal;
         $like->save();

        Log::info('Likes created', [
           'user_id' => $user->id,
           'likeable_type' => get_class($model),
           'likeable_id' => $model->id,
           'count' => $newTotal
       ]);

          Cache::forget($cacheKey);
    
           return response()->json([
            'totalLikes' => $this->getCachedTotalLikes($model),
            'userLikes' => $like->count,
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
       Log::info('Undo like', [
           'user_id' => $user->id,
           'likeable_type' => get_class($model),
           'likeable_id' => $model->id,
       ]);
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
