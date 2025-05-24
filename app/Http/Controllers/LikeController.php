<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
  public function like(Request $request)
{
    $user = Auth::user();
    $model = $this->resolveLikeable($request->type, $request->id);

    $like = Like::firstOrCreate([
        'user_id' => $user->id,
        'likeable_id' => $model->id,
        'likeable_type' => get_class($model),
    ],[
      'count' => 1
    ]);

    if (!$like->wasRecentlyCreated && $like->count < 10) {
        $like->increment('count');
    }

    $totalLikes = $model->likes()->sum('count');
    $userLikes = $model->likes()->where('user_id', $user->id)->sum('count');

    return response()->json([
        'totalLikes' => $totalLikes,
        'userLikes' => $userLikes
    ]);
    
}

public function undo(Request $request)
{
    $user = Auth::user();
    $model = $this->resolveLikeable($request->type, $request->id);

    Like::where([
        'user_id' => $user->id,
        'likeable_id' => $model->id,
        'likeable_type' => get_class($model),
    ])->delete();

       $totalLikes = $model->likes()->sum('count');

    return response()->json([
        'totalLikes' => $totalLikes,
        'userLikes' => 0
    ]);
}

private function resolveLikeable($type, $id)
{
    return match($type) {
        'post' => Post::findOrFail($id),
        default => abort(404),
    };
}
}
