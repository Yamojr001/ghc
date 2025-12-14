<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Volunteer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'phone', 'country', 'city', 'skills',
        'availability', 'interest_areas', 'experience', 'motivation',
        'status', 'notes',
    ];

    protected $casts = [
        'skills' => 'array',
        'interest_areas' => 'array',
    ];
}