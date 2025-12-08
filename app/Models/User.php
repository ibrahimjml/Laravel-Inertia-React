<?php

namespace App\Models;

use App\Enums\UserRole;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
      'username',
        'name',
        'email',
        'password',
        'role'
    ];

public function posts()
{
  return $this->hasMany(Post::class);
}
  public function followings(){
    return $this->belongsToMany(User::class,'followers','follower_id','user_id');
  }
  public function followers(){
    return $this->belongsToMany(User::class,'followers','user_id','follower_id');
  }
  public function isFollowing(User $user)
  {
      return $this->followings()->where('user_id', $user->id)->exists();
  }
    public function comments(){
    return $this->hasMany(Comment::class);
  }
  public function replies(){
    return $this->comments()->whereNotNull('parent_id');
  }
public function scopeIsSubscriber($query)
{
  return $query->where('role','subscriber')
               ->orWhere('role','suspended');
}
public function likes()
{
    return $this->hasMany(Like::class);
}
public function getRoleLabelAttribute()
    {
      return $this->role instanceof UserRole ? 
            $this->role->label() :
            UserRole::from($this->role)->label();
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }

    public function scopeSearch($query, array $search)
    {
        if ($search['search'] ?? false) {
            $query->where('name', 'like', '%' . request('search') . '%')
                  ->orWhere('email', 'like', '%' . request('search') . '%');
        }
        if ($search['suspended'] ?? false) {
          $query->where('role', 'suspended');
      }
    }
}
