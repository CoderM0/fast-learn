<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Course extends Model
{
    protected $guarded=[];
    protected $appends = ['num_of_lessons','num_of_subscribers','num_of_modules'];
    public function modules(){
        return $this->hasMany(Module::class)->with('lessons');
    }
    public function students(){
        return $this->belongsToMany(Student::class);
    }
    public function teacher(){
        return $this->belongsTo(Teacher::class);
    }
    public function getNumOfLessonsAttribute(){

        $modules=$this->modules;
        $count=0;
        foreach ($modules as $module) {
         $count+= count($module->lessons);
        }
        return $count;
    }
    public function getNumOfModulesAttribute(){

        return count($this->modules);
    }
     public function getNumOfSubscribersAttribute(){
        return count($this->students);
    }
    public function getRateAttribute(){
        $ratings=Rating::select('rate')->where('course_id',$this->id)->get() ;


        $total=count($ratings);
        if($total==0){
            $total=1;
        }
        $countofrates=0;
        foreach ($ratings as $rate) {
            $countofrates+=$rate->rate;
        }
        $avg=$countofrates/$total;
        return $avg;
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($course) {
            $dirName=$course->name;

            Storage::disk('public')->deleteDirectory("$dirName");

        });
    }
}
