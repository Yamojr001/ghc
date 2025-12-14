<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = [
        'email', 'name', 'status', 'source', 'interests',
    ];

    protected $casts = [
        'interests' => 'array',
    ];
}