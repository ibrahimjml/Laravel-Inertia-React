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
      'user_id',
      'approved'
    ];

    public function user()
    {
      return $this->belongsTo(User::class);
    }
    public function hashtags(){
      return $this->belongsToMany(Hashtag::class,'post_hashtag');
    }
    public function scopeSearch($query, array $search)
    {
      $query->when(!empty($search['search']), function ($query) use ($search) {
        $query->where(function ($query) use ($search) {
            $query->where('title', 'like', '%' . $search['search'] . '%')
                  ->orWhere('description', 'like', '%' . $search['search'] . '%');
        });
    });

    if (!empty($search['tag'])) {
       $query->whereHas('hashtags', function ($q) use ($search) {
        $q->where('name', $search['tag']);
    });
  }
     if (!empty($search['user_id'])) {
        $query->where('user_id', $search['user_id']);
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
