<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Module extends Model
{
    protected $appends = ['lessons_number'];

    protected $guarded = [];
    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function quize()
    {
        return $this->hasOne(Quize::class);
    }
    public function getLessonsNumberAttribute()
    {
        return count($this->lessons);
    }
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($module) {

            $dirName = $module->course->name;
            Storage::disk('public')->deleteDirectory("$dirName/$module->title");
        });
    }
    protected static function booted()
    {
        static::saved(function (Module $module) {

            if ($module->course_id) {
                Cache::forget("course_layout_data_{$module->course_id}");
            }
        });
        static::updated(function (Module $module) {

            if ($module->course_id) {
                Cache::forget("course_layout_data_{$module->course_id}");
            }
        });
        static::deleted(function (Module $module) {

            if ($module->course_id) {
                Cache::forget("course_layout_data_{$module->course_id}");
            }
        });
    }
}
