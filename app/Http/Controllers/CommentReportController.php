<?php

namespace App\Http\Controllers;

use App\Enums\ReportReason;
use App\Models\Comment;
use App\Models\CommentReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rules\Enum;

class CommentReportController extends Controller
{
    public function report(Request $request,Comment $comment)
    {
       Gate::authorize('report',$comment);

      if(env('IS_DEMO')) {
        return back()->with('demo', 'Action not allowed in demo mode');
      }
       $fields = $request->validate([
         'comment_id' => ['required', 'exists:comments,id'],
         'reason' => ['required', new Enum(ReportReason::class)],
         'other' => ['nullable', 'string'],
       ]);
      $exists = CommentReport::where('user_id',Auth::id())
                ->where('comment_id',$comment->id)->exists();
                if ($exists) {
                  return back()->with('error','you already reported this comment');
                }
        CommentReport::create([
        'user_id' => Auth::id(),
        'comment_id' => $comment->id,
        'reason' => ReportReason::from($fields['reason']),
        'other' => $request->reason === ReportReason::Other->value ? $fields['other'] : null,
    ]);
    
    return back()->with('success', 'Comment reported successfully.');
    }
}
