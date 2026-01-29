<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:50|regex:/^[\pL\pN\s]+$/u',
            'description' => 'required|string',
            'image' => 'nullable|mimes:jpg,png,jpeg|max:5000', 
            'tags' => 'nullable|array|max:4',
            'tags.*' => 'string|max:30|regex:/^[\pL\pN\s]+$/u',
            'remove_image' => 'nullable|boolean',
        ];
    }
    public function messages(): array
{
    return [
        'title.regex' => 'The title may only contain letters, numbers, and spaces.',
        'tags.*.regex' => 'Each tag may only contain letters, numbers, and spaces.',
    ];
}
}
