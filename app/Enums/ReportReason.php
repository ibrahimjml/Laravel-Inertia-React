<?php

namespace App\Enums;

enum ReportReason:string
{
    case Spam = 'Spam';
    case Harassment = 'Harassment';
    case RulesViolation = 'Rules Violation';
    case Other = 'Other';
}
