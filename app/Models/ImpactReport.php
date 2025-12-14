<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImpactReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'report_type', 'year', 'quarter', 'description',
        'file_url', 'cover_image', 'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}