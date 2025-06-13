<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Quize extends Model
{
    protected $guarded = [];
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
    public function students()
    {
        return $this->belongsToMany(Student::class);
    }
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
    protected static function booted()
    {
        static::saved(function (Quize $quize) {
            $quize->load('module');
            if ($quize->module_id && $quize->module->course_id) {
                Cache::forget("course_layout_data_{$quize->module->course_id}");
            }
        });
        static::deleted(function (Quize $quize) {
            $quize->load('module');

            if ($quize->module_id && $quize->module->course_id) {
                Cache::forget("course_layout_data_{$quize->module->course_id}");
            }
        });
    }
}
