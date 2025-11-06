<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_number')->unique();
            $table->string('type');
            $table->integer('capacity');
            $table->decimal('rent_amount', 10, 2);
            $table->enum('status', ['vacant', 'occupied'])->default('vacant');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('rooms');
    }
};