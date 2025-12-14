<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'phone', 'subject', 'message', 'inquiry_type',
        'status', 'assigned_to', 'response', 'responded_at',
    ];

    protected $casts = [
        'responded_at' => 'datetime',
    ];
}