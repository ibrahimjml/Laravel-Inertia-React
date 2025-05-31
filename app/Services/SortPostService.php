<?php

namespace App\Services;

use App\Models\Hashtag;
use Illuminate\Database\Eloquent\Builder;

class SortPostService
{
  public function sortPosts(Builder $query, string $sortOption = 'latest', $auth = null): Builder
{
    switch ($sortOption) {
        case 'oldest':
            $query->oldest();
            break;

        case 'followings':
            $followings = $auth?->followings->pluck('id') ?? [];
            $query->whereIn('user_id', $followings);
            break;

        case 'popular':
            $query->orderByDesc('likes_sum_count');
            break;

        case 'trend':
            $trendingHashtag = Hashtag::withCount('posts')
                ->having('posts_count', '>', 2)
                ->orderByDesc('posts_count')
                ->first();

            if ($trendingHashtag) {
                $query->whereHas('hashtags', fn($q) =>
                    $q->where('hashtags.id', $trendingHashtag->id)
                );
            } 
            break;

        case 'latest':
        default:
            $query->latest();
            break;
    }

    return $query;
}
}