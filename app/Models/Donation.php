<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'donor_name', 'donor_email', 'donor_country', 'donor_country_code', 'amount',
        'currency', 'amount_usd', 'donation_type', 'category', 'program_id',
        'payment_method', 'payment_reference', 'bank_proof_url', 'status',
        'is_anonymous', 'is_recurring', 'message', 'receipt_url', 'certificate_url',
        'verified_by', 'verified_at', 'notes',
    ];

    protected $casts = [
        'amount' => 'float',
        'amount_usd' => 'float',
        'is_anonymous' => 'boolean',
        'is_recurring' => 'boolean',
        'verified_at' => 'datetime',
    ];
}