<?php

namespace App\Services;

use App\Models\Post;
use App\Models\PostTranslation;
use Illuminate\Support\Facades\Auth ;
use Illuminate\Support\Facades\DB;

class PostService
{
    public function __construct(protected string $defaultLocale = 'en')
    {
        $this->defaultLocale = $defaultLocale; 
    }
  public function transformPost(Post $post)
    {
        $auth = Auth::user();
        $post->user_like = $post->likes->where('user_id', $auth?->id)->sum('count');
        $post->user->is_followed = $auth && $post->user->followers->contains($auth->id);

        return $post;
    }

    public function getLikersGrouped($post)
    {
        return $post->likes
            ->groupBy('user_id')
            ->map(function ($likes) {
                $user = $likes->first()->user;
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'count' => $likes->sum('count'),
                ];
            })
            ->values();
    }
    public function getComments(Post $post,$sort = 'New')
    {
    $comments = $post->comments()
                ->with([
                    'user',
                    'parent.user',
                    'likes' => fn($q) => $q->where('user_id', Auth::id())
                ])
                ->withCount([
                    'likes as likes_sum_count' => fn($q) => $q->select(DB::raw('SUM(count)'))
                ]);
               if ($sort === 'Top') {
                  $comments->orderByDesc('likes_sum_count');
               } else {
                 $comments->latest();
               }
              $comments = $comments->get()->map(function ($comment) {
                    $comment->user_like_count = $comment->likes->first()?->count ?? 0;
                    $comment->can_modify = Auth::user()?->can('modify', $comment);
                    $comment->can_report = Auth::user()?->can('report', $comment);
                    return $comment;
                });

    return $this->nestedComments($comments);
    }
private function nestedComments($comments)
  {
    $grouped = $comments->groupBy('parent_id');

    foreach ($comments as $comment) {
        $comment->replies = $grouped[$comment->id] ?? collect();
    }

    return $grouped[null] ?? collect(); 
  }
 public function create(array $data, string $locale)
    {
        
            if ($locale === $this->defaultLocale) {
                $post = Post::create(array_merge($data, [
                    'user_id' => Auth::id(),
                ]));
            } else {
                $post = Post::create([
                    'user_id' => Auth::id(),
                    'title' => $data['title'] ?? '',
                    'description' => $data['description'] ?? '',
                    'image' => $data['image'] ?? null,
                ]);

                PostTranslation::create([
                    'post_id' => $post->id,
                    'lang' => $locale,
                    'title' => $data['title'],
                    'description' => $data['description'],
                ]);
            }

            return $post;
    }
  public function update(Post $post, array $data, string $locale)
    {
            if ($locale === $this->defaultLocale) {
                $post->update($data);
            } else {
                $translation = $post->translations()->firstOrNew(['lang' => $locale]);
                $translation->title = $data['title'];
                $translation->description = $data['description'];
                $translation->save();
            }
    }
}