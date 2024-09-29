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
            $table->enum('status', ["open", "in-progress", "resolved", "closed"])->default('open')->comment('open, in-progress, resolved, closed');
            $table->enum('severity', ["low", "medium", "high", "critical"])->nullable()->comment('low, medium, high, critical');
            $table->enum('priority', ["low", "medium", "high", "urgent"])->nullable()->comment('low, medium, high, urgent');
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
