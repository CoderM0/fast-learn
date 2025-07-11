<?php

use App\Models\Option;
use App\Models\Question;
use App\Models\Quize;
use App\Models\QuizeStudent;
use App\Models\Student;
use App\Models\User;
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
        Schema::create('student_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(QuizeStudent::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Question::class);
            $table->foreignIdFor(Option::class);
            $table->boolean("is_correct_answer");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_answers');
    }
};
