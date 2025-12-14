<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('distributions', function (Blueprint $table) {
            $table->id();
            $table->string('program_id')->nullable();
            $table->string('field_officer_id')->nullable();
            $table->string('field_officer_name')->nullable();
            $table->string('location_name');
            $table->enum('location_type', ['school', 'community', 'health_center', 'other'])->nullable();
            $table->string('region')->nullable();
            $table->string('country')->nullable();
            $table->double('gps_latitude', 10, 7)->nullable();
            $table->double('gps_longitude', 10, 7)->nullable();
            $table->integer('beneficiary_count');
            $table->integer('items_distributed')->nullable();
            $table->date('distribution_date');
            $table->json('photo_urls')->nullable();
            $table->string('video_url')->nullable();
            $table->string('verification_document_url')->nullable();
            $table->string('beneficiary_list_url')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('approved_by')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('distributions');
    }
};