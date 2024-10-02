<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bugs', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->jsonb('image')->nullable();
            $table->text('description')->nullable();
            $table->string('type')->nullable();
            $table->enum('status', ["OPEN", "IN-PROGRESS", "RESOLVED", "CLOSED"])->default('OPEN')->comment('OPEN, IN-PROGRESS, RESOLVED, CLOSED');
            $table->enum('severity', ["LOW", "MEDIUM", "HIGH", "CRITICAL"])->nullable()->comment('LOW, MEDIUM, HIGH, CRITICAL');
            $table->enum('priority', ["LOW", "MEDIUM", "HIGH", "URGENT"])->nullable()->comment('LOW, MEDIUM, HIGH, URGENT');
            $table->dateTime('due_date')->nullable();

            $table->foreignUlid('reported_by')->constrained('customers')->cascadeOnDelete();

            $table->foreignUlid('assigned_to')->nullable()->constrained('users')->cascadeOnDelete();

            $table->foreignUlid('project_id')->nullable()->constrained('projects')->cascadeOnDelete();

            $table->string('resolution')->nullable();     // Resolution details (if any)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bugs');
    }
};
