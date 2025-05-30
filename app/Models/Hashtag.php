<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hashtag extends Model
{
  use HasFactory;
    protected $fillable=['name'];

    public function posts()
    {
      return $this->belongsToMany(Post::class,'post_hashtag');
    }
      public function scopeSearch($query, array $search)
      {
        if(isset($search['tag'])){
          $query->where('name','LIKE','%'. $search['tag'] .'%');
        }
      }
}
