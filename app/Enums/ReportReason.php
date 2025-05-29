<?php

namespace App\Enums;

enum ReportReason:string
{
    case Spam = 'Spam';
    case Harassment = 'Harassment';
    case RulesViolation = 'Rules Violation';
    case Other = 'Other';
    public function label(): string
    {
    return match ($this) {
        self::Spam => 'Spam',
        self::Harassment => 'Harassment',
        self::RulesViolation => 'Broke Community Rules',
        self::Other => 'Other',
    };
    }
}

