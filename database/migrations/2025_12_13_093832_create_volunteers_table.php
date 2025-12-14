<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('volunteers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->json('skills')->nullable();
            $table->enum('availability', ['full_time', 'part_time', 'weekends', 'flexible'])->nullable();
            $table->json('interest_areas')->nullable();
            $table->text('experience')->nullable();
            $table->text('motivation')->nullable();
            $table->enum('status', ['pending', 'approved', 'active', 'inactive'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('volunteers');
    }
};