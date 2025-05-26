<?php

namespace App\Services;

use App\Models\Hashtag;
use App\Models\Post;

class HashtagService
{
  public function attachhashtags(Post $post, array $hashtag)
  {
        foreach ($hashtag as $tag) {
            $tag = strip_tags(trim($tag));

            if ($tag) {
                $hashtagModel = Hashtag::firstOrCreate(['name' => $tag]);
                $post->hashtags()->attach($hashtagModel->id);
            }
        }
  }
}