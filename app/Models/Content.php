<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Content extends Model
{
    protected $guarded = [];
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
    protected static function booted()
    {
        static::saved(function (Content $content) {

            $content->load(['lesson', 'lesson.module']);
            if ($content->lesson_id && $content->lesson->module_id && $content->lesson->module->course_id) {
                Cache::forget("course_layout_data_{$content->lesson->module->course_id}");
            }
        });
        static::updated(function (Content $content) {
            $content->load(['lesson', 'lesson.module']);


            if ($content->lesson_id && $content->lesson->module_id && $content->lesson->module->course_id) {
                Cache::forget("course_layout_data_{$content->lesson->module->course_id}");
            }
        });
        static::deleted(function (Content $content) {
            $content->load(['lesson', 'lesson.module']);

            if ($content->lesson_id && $content->lesson->module_id && $content->lesson->module->course_id) {
                Cache::forget("course_layout_data_{$content->lesson->module->course_id}");
            }
        });
    }
}
