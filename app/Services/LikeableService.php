<?php
namespace App\Services;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class LikeableService
{
    public static function resolve(string $type, int $id)
    {
        return match(strtolower($type)) {
            'post' => Post::findOrFail($id),
            'comment' => Comment::findOrFail($id),
            default => throw new ModelNotFoundException("Invalid likeable type [$type]"),
        };
    }
}
