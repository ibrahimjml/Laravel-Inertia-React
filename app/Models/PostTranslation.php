<?php

namespace App\Models;

use App\Traits\PostHasTranslation;
use Illuminate\Database\Eloquent\Model;

class PostTranslation extends Model
{
    protected $table = 'post_translations';
    protected $fillable = [
        'post_id',
        'lang',
        'title',
        'description',
    ];

    protected static function booted()
    {
      static::updating(function(PostTranslation $translation){
         if ($translation->isDirty('description')) {
                deleteRemovedEditorImages(
                    $translation->getOriginal('description'),
                    $translation->description
                );
            }
      });
      static::deleting(function(PostTranslation $translation){
        deleteAllEditorImages($translation->description);
      });
      
    }
}
