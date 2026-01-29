<?php
namespace App\Traits;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait ImageUpload
{
    public function handleImageUpload(?UploadedFile $image, string $slug): ?string
    {
        if (!$image) return null;

        $imageName = uniqid() . '-' . $slug . '.' . $image->extension();
        Storage::disk('public')->putFileAs('images', $image, $imageName);
        return $imageName;
    }
}