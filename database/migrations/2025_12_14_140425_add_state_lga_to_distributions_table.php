<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('distributions', function (Blueprint $table) {
            $table->string('state')->nullable()->after('region');
            $table->string('local_government')->nullable()->after('state');
            $table->json('items_list')->nullable()->after('items_distributed');
            $table->decimal('total_amount', 12, 2)->nullable()->after('items_list');
        });
    }

    public function down(): void
    {
        Schema::table('distributions', function (Blueprint $table) {
            $table->dropColumn(['state', 'local_government', 'items_list', 'total_amount']);
        });
    }
};
