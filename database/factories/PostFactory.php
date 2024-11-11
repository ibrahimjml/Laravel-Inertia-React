<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;
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
        return [
            'user_id' => $this->faker->randomElement([1, 2]), 
            'title' => $this->faker->sentence(10),
            'description' => $this->faker->paragraph(12),
            'approved'=>true,
            'tags' => $this->faker->randomElement([
                'laravel',
                'tailwind,php,C',
                'java,html'
            ]),
        ];
    }
}
