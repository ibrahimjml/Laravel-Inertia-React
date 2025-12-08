<?php

namespace Database\Seeders;

use App\Models\Hashtag;
use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(2)->create();
        $hashtags = Hashtag::factory(10)->create();
    
        Post::factory(20)->make()->each(function ($post) use ($users, $hashtags) {
            $post->user_id = $users->random()->id;
            $post->save();

          
            $post->hashtags()->attach(
                $hashtags->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
        
        $this->call([
            AdminSeeder::class,
        ]);
    }
}
