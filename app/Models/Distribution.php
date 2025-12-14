<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Distribution extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_id', 'field_officer_id', 'field_officer_name', 'location_name', 'location_type',
        'region', 'country', 'gps_latitude', 'gps_longitude', 'beneficiary_count',
        'items_distributed', 'distribution_date', 'photo_urls', 'video_url',
        'verification_document_url', 'beneficiary_list_url', 'status', 'approved_by',
        'approved_at', 'rejection_reason', 'notes',
    ];

    protected $casts = [
        'distribution_date' => 'date',
        'photo_urls' => 'array',
        'gps_latitude' => 'float',
        'gps_longitude' => 'float',
        'approved_at' => 'datetime',
    ];
}