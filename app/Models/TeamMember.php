<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'title', 'bio', 'image_url', 'category',
        'linkedin', 'twitter', 'email', 'display_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}