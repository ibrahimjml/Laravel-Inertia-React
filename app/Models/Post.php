<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Post extends Model
{
  use HasFactory;

    protected $fillable = [
      'title',
      'description',
      'image',
      'tags',
      'user_id',
      'approved'
    ];

    public function user()
    {
      return $this->belongsTo(User::class);
    }

    public function scopeSearch($query, array $search)
    {
        if ($search['search'] ?? false) {
            $query->where('title', 'like', '%' . request('search') . '%')
                  ->orWhere('description', 'like', '%' . request('search') . '%');
        }
        if ($search['tag'] ?? false) {
          $query->where('tags', 'like', '%' . request('tag') . '%');
      }
    }

    public function scopeFilter($query, array $filter)
    {
        if ($filter['search'] ?? false) {
            $query->where('title', 'like', '%' . request('search') . '%');
                
        }
    if($filter['unapproved'] ?? false){
      $query->where('approved',false);
    }
    }
}
