<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use PHPUnit\Event\TestSuite\Loaded;

class Option extends Model
{
    protected $guarded = [];
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
    protected static function booted()
    {
        static::saved(function (Option $option) {
            $option->load(['question', 'question.quize', 'question.quize.module']);
            if ($option->question_id && $option->question->quize_id && $option->question->quize->module_id && $option->question->quize->module->course_id) {
                Cache::forget("course_layout_data_{$option->question->quize->module->course_id}");
            }
        });
        static::deleted(function (Option $option) {
            $option->load(['question', 'question.quize', 'question.quize.module']);
            if ($option->question_id && $option->question->quize_id && $option->question->quize->module_id && $option->question->quize->module->course_id) {
                Cache::forget("course_layout_data_{$option->question->quize->module->course_id}");
            }
        });
    }
}
