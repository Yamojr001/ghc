<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'category', 'program_id', 'amount',
        'currency', 'amount_usd', 'expense_date', 'vendor', 'receipt_url',
        'status', 'approved_by', 'approved_at',
    ];

    protected $casts = [
        'amount' => 'float',
        'amount_usd' => 'float',
        'expense_date' => 'date',
        'approved_at' => 'datetime',
    ];
}