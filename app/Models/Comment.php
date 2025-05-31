<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
      protected $fillable =['user_id','post_id','parent_id','content','replies_count'];
      public function post(){
      return $this->belongsTo(Post::class);
    }
   public function likes()
    {
    return $this->morphMany(Like::class, 'likeable');
    }
    public function user(){
      return $this->belongsTo(User::class);
    }

    public function parent(){
      return $this->belongsTo(Comment::class,'parent_id');
    }

    public function replies(){
      return $this->hasMany(Comment::class, 'parent_id')->orderBy('created_at','desc');
    }
}
