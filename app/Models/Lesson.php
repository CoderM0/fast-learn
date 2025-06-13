<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Lesson extends Model
{
    protected $guarded = [];
    public function contents()
    {
        return $this->hasMany(Content::class);
    }
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    protected static function booted()
    {
        static::saved(function (Lesson $lesson) {

            $lesson->load(['module']);
            if ($lesson->module_id && $lesson->module->course_id) {
                Cache::forget("course_layout_data_{$lesson->module->course_id}");
            }
        });
        static::updated(function (Lesson $lesson) {
            $lesson->load(['module']);


            if ($lesson->module_id && $lesson->module->course_id) {
                Cache::forget("course_layout_data_{$lesson->module->course_id}");
            }
        });
        static::deleted(function (Lesson $lesson) {

            $lesson->load(['module']);
            if ($lesson->module_id && $lesson->module->course_id) {
                Cache::forget("course_layout_data_{$lesson->module->course_id}");
            }
        });
    }
}
