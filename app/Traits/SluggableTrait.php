<?php
namespace App\Traits;

use App\Models\Post;

trait SluggableTrait
{
    public static function handle(string $slug): string
    {
      $originalSlug = $slug;
       $count = 1;

       do { 
           $exists = Post::where('slug', $slug)->exists();
          if ($exists) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }
       } while ($exists);

       return $slug;
    }
}