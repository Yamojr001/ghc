<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'short_description', 'icon', 'image_url',
        'goal', 'monthly_target', 'total_target', 'required_funding',
        'current_funding', 'beneficiaries_reached', 'is_active', 'display_order',
    ];

    protected $casts = [
        'required_funding' => 'float',
        'current_funding' => 'float',
        'is_active' => 'boolean',
    ];
}