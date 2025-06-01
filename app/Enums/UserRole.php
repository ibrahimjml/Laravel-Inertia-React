<?php

namespace App\Enums;

enum UserRole:string
{
    case Admin = 'admin';
    case Moderator = 'moderator';
    case User = 'subscriber';
    case Suspended = 'suspended';

    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Administrator',
            self::Moderator => 'Moderator',
            self::User => 'User',
            self::Suspended => 'Suspended',
        };
    }
    public static function values(): array
{
    return array_map(fn($role) => [
        'value' => $role->value,
        'label' => $role->label()
    ], self::cases());
}
}
