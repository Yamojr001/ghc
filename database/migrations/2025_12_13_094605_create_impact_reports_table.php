<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('impact_reports', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('report_type', ['annual', 'quarterly', 'audit', 'financial', 'impact']);
            $table->integer('year');
            $table->integer('quarter')->nullable();
            $table->text('description')->nullable();
            $table->string('file_url')->nullable();
            $table->string('cover_image')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('impact_reports');
    }
};