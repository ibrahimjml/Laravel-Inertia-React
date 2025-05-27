<?php

namespace App\Observers;

use App\Models\Post;

class PostObserver
{
    

    /**
     * Handle the Post "updated" event.
     */
    public function updating(Post $post): void
    {
      if ($post->isDirty('image')) {
            $oldImage = $post->getRawOriginal('image');
            $imagePath = public_path('images/' . $oldImage);

            if ($oldImage && file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
    }

    /**
     * Handle the Post "deleted" event.
     */
    public function deleting(Post $post): void
    {
        $originalImage = $post->getRawOriginal('image'); 
        $imagePath = public_path('images/' . $originalImage);

       if ($originalImage && file_exists($imagePath)) {
        unlink($imagePath);
        }
      }

    
}
