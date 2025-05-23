<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
          'name' => 'admin',
          'username' => 'admin123',
          'email' => env('ADMIN_EMAIL'),
          'password' => Hash::make(env('ADMIN_PASS')),
          'role' => 'admin',
          'email_verified_at' => now(),
        ]);
    }
}
