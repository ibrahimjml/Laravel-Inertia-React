<?php

namespace App\Services;

use App\Models\Hashtag;
use App\Models\Post;

class HashtagService
{
  public function attachHashtags(Post $post, ?array $tags)
  {
        foreach ($tags as $tag) {
            $tag = strip_tags(trim($tag));

            if ($tag) {
                $hashtagModel = Hashtag::firstOrCreate(['name' => $tag]);
                $post->hashtags()->attach($hashtagModel->id);
            }
        }
  }
  public function syncHashtags(Post $post, ?array $tags): void
    {
        if (!empty($tags)) {
            $hashtagNames = array_unique(array_filter(array_map('trim', $tags)));
            $hashtagIds = [];

            foreach ($hashtagNames as $name) {
                $hashtag = Hashtag::firstOrCreate(['name' => strip_tags($name)]);
                $hashtagIds[] = $hashtag->id;
            }

            $post->hashtags()->sync($hashtagIds);
        } else {
            $post->hashtags()->detach();
        }
    }
}