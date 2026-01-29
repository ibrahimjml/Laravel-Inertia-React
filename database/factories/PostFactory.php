<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
  protected $model = Post::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      $title = $this->faker->sentence(10);
        return [
            'user_id' => $this->faker->randomElement([1,2]), 
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraph(12),
            'approved'=>true,
        ];
    }
}
