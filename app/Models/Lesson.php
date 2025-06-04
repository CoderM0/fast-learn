<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $guarded=[];
    public function contents(){
        return $this->hasMany(Content::class);
    }
    public function module(){
        return $this->belongsTo(Module::class);
    }
    public function course(){
        return $this->belongsTo(Course::class);
    }
}
