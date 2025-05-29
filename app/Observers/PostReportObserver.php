<?php

namespace App\Observers;

use App\Models\PostReport;

class PostReportObserver
{
    /**
     * Handle the PostReport "created" event.
     */
    public function created(PostReport $postReport): void
    {
        $postReport
    }

    /**
     * Handle the PostReport "deleted" event.
     */
    public function deleted(PostReport $postReport): void
    {
        //
    }

}
