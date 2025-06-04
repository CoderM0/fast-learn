<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'role',
        'avatar',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }
    public function student()
    {
        return $this->hasOne(Student::class);
    }
    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }
    public function quizes()
    {
        return $this->belongsToMany(Quize::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function replies()
    {
        return $this->hasMany(Reply::class);
    }
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($user) {

            if ($user->teacher && $user->teacher->courses) {
                $ava = $user->teacher->avatar;
                Storage::disk('public')->delete("$ava");
                foreach ($user->teacher->courses as  $course) {
                    Storage::disk('public')->deleteDirectory($course->name);
                }
            } else if ($user->student) {
                $ava = $user->student->avatar;
                Storage::disk('public')->delete("$ava");
            }
        });
    }
}
