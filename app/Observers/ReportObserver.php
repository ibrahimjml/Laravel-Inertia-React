<?php

namespace App\Observers;

use App\Models\PostReport;

class ReportObserver
{
    /**
     * Handle the PostReport "created" event.
     */
    public function created(PostReport $postReport): void
    {
        $postReport->post()->increment('reported_count');
    }


    /**
     * Handle the PostReport "deleted" event.
     */
    public function deleted(PostReport $postReport): void
    {
        $postReport->post()->decrement('reported_count');
    }

  
}
