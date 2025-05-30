<?php

namespace App\Observers;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
                 Log::info('Old image deleted for post', [
                'post_id' => $post->id,
                'image' => $oldImage,
                'user_id' => Auth::id() 
                    ]);
            }else{
              Log::warning('No old image found or file does not exist for deletion', [
            'post_id' => $post->id,]);
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
         Log::info('Image deleted for post', [
                'post_id' => $post->id,
                'image' => $originalImage,
                'user_id' => Auth::id() 
            ]);
        }else{
          Log::warning('No image found or file does not exist for deletion', [
            'post_id' => $post->id,]);
        }
      }

    
}
