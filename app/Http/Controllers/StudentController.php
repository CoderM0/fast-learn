<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Rating;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        // $student=Student::with(['courses'])->find(Auth::user()->student->id);
        $user_courses = Student::with(['courses' => function ($query) {
            $query->withPivot('created_at', 'updated_at');
        }])->find(Auth::user()->student->id)->courses;
        $rated_courses = Rating::all()->pluck("course_id");
        return Inertia::render("Student/StudentDashboard", ['rated_courses' => $rated_courses, 'courses' => $user_courses]);
    }
    public function view_all_courses()
    {
        return Inertia::render("Student/AllCourses", ['courses' => Course::with(['students' => function ($query) {
            $query->withPivot('created_at', 'updated_at');
        }])->get(), 'student' => Auth::user()->student]);
    }
    public function view_course($course_id)
    {
        return Inertia::render("Student/CourseInfo", ['student' => Auth::user()->student, 'course' => Course::with(["teacher", "teacher.user"])->find($course_id)]);
    }
    public function view_profile()
    {
        $stu = Student::with(['courses', 'user'])->where('user_id', Auth::id())->first();
        return Inertia::render("Student/ViewProfile", ['student_pro' => $stu,]);
    }
    public function edit_student_personal()
    {
        $stu = Student::with(['courses', 'user'])->where('user_id', Auth::id())->first();
        return Inertia::render("Student/EditStudentPersonalInfo", ['student' => $stu,]);
    }
    public function update_student_personal()
    {
        $validated_student = request()->validate([
            'full_name' => 'sometimes|string',
            'phone_number' => 'sometimes|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
        ]);
        $student = Student::where("user_id", Auth::id())->first();
        $user = User::find($student->user_id);
        $student->update($validated_student);
        if (request()->file('avatar')) {
            Storage::disk('public')->delete($user->avatar);
            $newavatar =  Storage::disk('public')->put('students', request()->file('avatar'));
            $user->avatar = $newavatar;
            $user->save();
        }

        $validated_user = request()->validate([
            'email' => 'sometimes|string|lowercase|email|max:255'
        ]);
        $user->update([...$validated_user, 'name' => request()->full_name]);
        return redirect()->route('admin.manage_students');
    }
}
