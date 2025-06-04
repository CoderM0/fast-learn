<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    protected $guarded=[];
    public function courses(){
        return $this->belongsToMany(Course::class);
    }
    public function quizes(){
        return $this->belongsToMany(Quize::class)->withPivot('score');;
    }
    public function user(){
       return $this->BelongsTo(User::class);
    }

}
