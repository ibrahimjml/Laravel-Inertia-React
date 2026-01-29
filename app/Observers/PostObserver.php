<?php

namespace App\Observers;

use App\Models\Post;

class PostObserver
{

  public function creating(Post $post)
  {
    updatePostSlug($post);
  }
  /**
   * Handle the Post "updated" event.
   */
  public function updating(Post $post): void
  {
    if ($post->isDirty('title')) {
      updatePostSlug($post);
    }
    if ($post->isDirty('image')) {
      deletePublicImage(
        $post->getRawOriginal('image'),
        $post->id
      );
    }

    if ($post->isDirty('description')) {
      deleteRemovedEditorImages(
        $post->getOriginal('description'),
        $post->description
      );
    }
  }

  /**
   * Handle the Post "deleted" event.
   */
  public function deleting(Post $post): void
  {
    deletePublicImage(
      $post->getRawOriginal('image'),
      $post->id
    );

    deleteAllEditorImages($post->description);
  }
}
