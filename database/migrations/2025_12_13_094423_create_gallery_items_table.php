<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->enum('media_type', ['image', 'video']);
            $table->string('media_url');
            $table->string('thumbnail_url')->nullable();
            $table->enum('category', [
                'distribution', 'training', 'education', 'community', 'team', 'events'
            ])->nullable();
            $table->string('location')->nullable();
            $table->string('program_id')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('display_order')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery_items');
    }
};