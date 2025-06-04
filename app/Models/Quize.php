<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quize extends Model
{
    protected $guarded=[];
   public function questions(){
    return $this->hasMany(Question::class);
   }
   public function students(){
    return $this->belongsToMany(Student::class);
   }
   public function module(){
   return $this->belongsTo(Module::class);
   }
}
