<?php

namespace App\Models;

use App\Enums\ReportReason;
use Illuminate\Database\Eloquent\Model;

class PostReport extends Model
{
    protected $fillable = ['user_id','post_id','reason','other'];
    protected $casts = [
      'reason' => ReportReason::class
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public function getReasonLabelAttribute()
    {
      return $this->reason instanceof ReportReason ? 
            $this->reason->label() :
            ReportReason::from($this->reason)->label();
    }
}
