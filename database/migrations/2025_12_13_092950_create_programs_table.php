<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('short_description')->nullable();
            $table->string('icon')->nullable();
            $table->string('image_url')->nullable();
            $table->string('goal')->nullable();
            $table->integer('monthly_target')->nullable();
            $table->integer('total_target')->nullable();
            $table->decimal('required_funding', 10, 2)->nullable();
            $table->decimal('current_funding', 10, 2)->nullable();
            $table->integer('beneficiaries_reached')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};