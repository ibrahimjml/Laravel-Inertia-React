<?php

namespace App\Traits;

use App\Models\PostTranslation;

trait PostHasTranslation
{
    public function translations()
    {
        return $this->hasMany(PostTranslation::class);
    }
    public function translation()
    {
        return $this->hasOne(PostTranslation::class)->where('lang', app()->getLocale());
    }
    public function getTitleAttribute()
    {
      return optional($this->translation)->title ?? $this->attributes['title'];
    }
    public function getDescriptionAttribute()
    {
      return optional($this->translation)->description ?? $this->attributes['description'];
    }
}
