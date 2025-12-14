<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FAQ extends Model
{
    use HasFactory;

    protected $fillable = [
        'question', 'answer', 'category', 'display_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}