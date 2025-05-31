<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Services\LikeableService;
use App\Services\LikeService;
class LikeController extends Controller
{
     protected LikeService $likeService;
      public function __construct(LikeService $likeService) {
        $this->likeService = $likeService;
      }

    public function like(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'id' => 'required|integer',
            'count' => 'required|integer|min:1|max:30'
        ]);

        $model = LikeableService::resolve($request->type, $request->id);
        $result = $this->likeService->like($model, $request->count);

        return response()->json($result);
    }

    public function undo(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'id' => 'required|integer',
        ]);

        $model = LikeableService::resolve($request->type, $request->id);
        $result = $this->likeService->undo($model);

        return response()->json($result);
    }
}
