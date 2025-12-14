<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('donor_name')->nullable();
            $table->string('donor_email');
            $table->string('donor_country')->nullable();
            $table->string('donor_country_code', 2)->nullable(); // ISO country code, e.g., US, GB
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD'); // USD, GBP, EUR, NGN
            $table->decimal('amount_usd', 10, 2)->nullable(); // Amount converted to USD
            $table->enum('donation_type', ['one_time', 'monthly', 'corporate'])->default('one_time');
            $table->enum('category', ['pad', 'empower', 'school', 'custom', 'corporate'])->nullable();
            $table->string('program_id')->nullable(); // Foreign key to programs table (optional)
            $table->enum('payment_method', ['stripe', 'paypal', 'paystack', 'flutterwave', 'bank_transfer'])->default('bank_transfer');
            $table->string('payment_reference')->nullable();
            $table->string('bank_proof_url')->nullable();
            $table->enum('status', ['pending', 'verified', 'rejected', 'refunded'])->default('pending');
            $table->boolean('is_anonymous')->default(false);
            $table->boolean('is_recurring')->default(false);
            $table->text('message')->nullable();
            $table->string('receipt_url')->nullable();
            $table->string('certificate_url')->nullable();
            $table->string('verified_by')->nullable(); // Email of admin who verified
            $table->timestamp('verified_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};