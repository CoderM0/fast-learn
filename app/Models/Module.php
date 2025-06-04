<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Module extends Model
{
    protected $appends = ['lessons_number'];

    protected $guarded=[];
   public function lessons(){
    return $this->hasMany(Lesson::class);
   }
   public function course(){
    return $this->belongsTo(Course::class);
   }
   public function quize(){
    return $this->hasOne(Quize::class);
   }
   public function getLessonsNumberAttribute(){
    return count($this->lessons);
   }
   protected static function boot()
{
    parent::boot();

    static::deleting(function ($module) {
        $dirName=$module->course->name;
        Storage::disk('public')->deleteDirectory("$dirName/$module->title");
        // $module->lessons()->with('contents')->get()->each(function ($lesson) {
        //     $lesson->contents->each(function ($content) {
        //         if ($content->filepath && Storage::disk('public')->exists($content->filepath)) {
        //             Storage::disk('public')->delete($content->filepath);
        //         }
        //     });
        // });
    });
}
}
