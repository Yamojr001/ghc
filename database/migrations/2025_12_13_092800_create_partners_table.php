<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo_url')->nullable();
            $table->string('website')->nullable();
            $table->text('description')->nullable();
            $table->enum('partnership_type', ['corporate_sponsor', 'ngo_partner', 'government', 'foundation', 'media', 'implementing_partner'])->nullable();
            $table->enum('contribution_type', ['financial', 'in_kind', 'technical', 'advocacy'])->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('display_order')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};