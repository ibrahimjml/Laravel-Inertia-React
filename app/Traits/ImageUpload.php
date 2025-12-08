<?php
namespace App\Traits;
use Illuminate\Http\UploadedFile;

trait ImageUpload
{
    public function handleImageUpload(?UploadedFile $image): ?string
    {
        if (!$image) return null;

        $imageName = uniqid() . '.' . $image->extension();
        $image->move(public_path('images'), $imageName);
        return $imageName;
    }
}