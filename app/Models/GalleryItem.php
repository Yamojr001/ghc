<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'media_type', 'media_url', 'thumbnail_url',
        'category', 'location', 'program_id', 'is_featured', 'display_order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}