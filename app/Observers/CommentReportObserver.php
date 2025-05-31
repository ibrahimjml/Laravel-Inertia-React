<?php

namespace App\Observers;

use App\Models\CommentReport;

class CommentReportObserver
{
    /**
     * Handle the CommentReport "created" event.
     */
    public function created(CommentReport $commentReport): void
    {
        $commentReport->comment()->increment('reported_count');
    }

  
    public function deleted(CommentReport $commentReport): void
    {
        $commentReport->comment()->decrement('reported_count');
    }

  
}
