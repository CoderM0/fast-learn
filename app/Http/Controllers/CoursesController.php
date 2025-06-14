<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Rating;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CoursesController extends Controller
{
    public function index()
    {
        return Inertia::render('languages/Languages', ['courses' => Course::all()]);
    }
    public function show($id)
    {
        return Inertia::render('languages/Home', ['course' => Course::with(['modules.lessons.contents', 'modules.quize', 'modules.quize.questions'])->findOrFail($id)]);
    }
    public function enroll($course)
    {
        $course = Course::find($course);
        $student = Auth::user()->student;
        $course->students()->attach($student, [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        return redirect()->route('courses.enrolled.index', $course->id);
    }
    public function add_rate($course_id)
    {
        Rating::create([
            'student_id' => Auth::user()->student->id,
            'course_id' => $course_id,
            'rate' => request()->rate
        ]);
        return redirect()->route("student.dashboard");
    }
}
