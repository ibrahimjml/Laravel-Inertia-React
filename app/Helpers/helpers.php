<?php

use App\Traits\SluggableTrait;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

if(!function_exists('extractEditorImages')) {
  function extractEditorImages(string $content): array
  {
      preg_match_all('/!\[.*?\]\((.*?)\)/', $content, $matches);
  
      return collect($matches[1])
          ->filter(fn ($url) => str_contains($url, '/storage/posts/'))
          ->map(function ($url) {
    
              return str_replace(asset('storage/') , '', $url);
          })
          ->unique()
          ->values()
          ->toArray();
  }
}

if (! function_exists('updatePostSlug')) {
    function updatePostSlug($post): void
    {
            $post->slug = SluggableTrait::handle(
                Str::slug($post->title)
            );
    }
}

if (! function_exists('deletePublicImage')) {
    function deletePublicImage(?string $path, int $postId): void
    {
        if ($path && Storage::disk('public')->exists('images/' . $path)) {
            Storage::disk('public')->delete('images/' . $path);

            Log::info('Image deleted', [
                'post_id' => $postId,
                'image' => $path,
            ]);
        }
    }
}

if (! function_exists('deleteRemovedEditorImages')) {
    function deleteRemovedEditorImages(string $old, string $new): void
    {
        $oldImages = extractEditorImages($old);
        $newImages = extractEditorImages($new);

        $deleted = array_diff($oldImages, $newImages);

        foreach ($deleted as $image) {
            Storage::disk('public')->delete($image);
        }
    }
}

if (! function_exists('deleteAllEditorImages')) {
    function deleteAllEditorImages(string $content): void
    {
        foreach (extractEditorImages($content) as $image) {
            Storage::disk('public')->delete($image);
        }
    }
}