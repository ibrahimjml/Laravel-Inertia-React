<?php

namespace App\Http\Controllers;

use App\Enums\ReportReason;
use App\Http\Controllers\Controller;
use App\Models\PostReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

class PostReportController extends Controller
{
    public function store(Request $request)
    {
       $fields = $request->validate([
         'post_id' => ['required', 'exists:posts,id'],
        'reason' => ['required', new Enum(ReportReason::class)],
        'other' => ['nullable', 'string'],
       ]);
      $exists = PostReport::where('user_id',Auth::id())
                ->where('post_id',$fields['post_id'])->exists();
                if ($exists) {
                  return back()->with('error','you already reported this post');
                }
        PostReport::create([
        'user_id' => Auth::id(),
        'post_id' => $fields['post_id'],
        'reason' => ReportReason::from($fields['reason']),
        'other' => $request->reason === ReportReason::Other->value ? $fields['other'] : null,
    ]);
    
    return back()->with('success', 'Post reported successfully.');
    }

}
