<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Question extends Model
{
    protected $guarded = [];
    public function options()
    {
        return $this->hasMany(Option::class);
    }
    public function quize()
    {
        return $this->belongsTo(Quize::class);
    }
    protected static function booted()
    {
        static::saved(function (Question $question) {
            $question->load(['quize', 'quize.module']);
            if ($question->quize_id && $question->quize->module_id && $question->quize->module->course_id) {
                Cache::forget("course_layout_data_{$question->quize->module->course_id}");
            }
        });
        static::deleted(function (Question $question) {
            $question->load(['quize', 'quize.module']);
            if ($question->quize_id && $question->quize->module_id && $question->quize->module->course_id) {
                Cache::forget("course_layout_data_{$question->quize->module->course_id}");
            }
        });
    }
}
