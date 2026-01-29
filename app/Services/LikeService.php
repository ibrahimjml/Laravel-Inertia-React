<?php

namespace App\Services;

use App\Models\Like;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class LikeService
{
  const CACHE_DURATION = 5;
  const MAX_LIKES_PER_USER = 30;

  public function like($model, int $count)
  {
    $user = Auth::user();
    $cacheKey = $this->getCacheKey($model);

    return DB::transaction(function () use ($user, $model, $count, $cacheKey) {
      $like = $model->likes()->firstOrCreate(
        ['user_id' => $user->id],
        ['count' => 0]
      );

      $newTotal = min($like->count + $count, self::MAX_LIKES_PER_USER);

      if ($newTotal >= self::MAX_LIKES_PER_USER) {
        Log::info('Max likes hit for', [
          'user_id' => $user->id,
          'likeable_id' => $model->id,
          'likeable_type' => $model->getMorphClass(),
          'count' => $newTotal
        ]);
      }

      $like->count = $newTotal;
      $like->save();

      Log::info('Likes created', [
        'user_id' => $user->id,
        'likeable_id' => $model->id,
        'likeable_type' => $model->getMorphClass(),
        'count' => $newTotal
      ]);

      Cache::forget($cacheKey);

      return [
        'totalLikes' => $this->getCachedTotalLikes($model),
        'userLikes' => $like->count
      ];
    });
  }

  public function undo($model)
  {
    $user = Auth::user();
    $cacheKey = $this->getCacheKey($model);

    $model->likes()
      ->where('user_id', $user->id)
      ->delete();

    Log::info('Undo like', [
      'user_id' => $user->id,
      'likeable_id' => $model->id,
      'likeable_type' => $model->getMorphClass()
    ]);

    Cache::forget($cacheKey);

    return [
      'totalLikes' => $this->getCachedTotalLikes($model),
      'userLikes' => 0
    ];
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
}
