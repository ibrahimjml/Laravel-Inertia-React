<?php

namespace App\Observers;

use App\Models\Post;

class PostObserver
{
    

    /**
     * Handle the Post "updated" event.
     */
    public function updated(Post $post): void
    {
        if ($post->isDirty('image')) {
        $oldImage = $post->getOriginal('image');
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
        if ($post->image) {
      $imagePath = public_path('images/' . $post->image);
      if (file_exists($imagePath)) {
          unlink($imagePath);  
      } 
    }
    }

    
}
