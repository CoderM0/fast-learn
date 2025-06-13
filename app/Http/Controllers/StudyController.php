<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Course;
use App\Models\Quize;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudyController extends Controller
{
    public function index($course)
    {


        // return redirect()->route("content.show", [$course->id, $course->modules[0]->lessons[0]->id, $course->modules[0]->lessons[0]->contents[0]->id]);
        $data = "index";
        if (Auth::user()->role == 1) {
            $user = Auth::user()->teacher;
        } else if (Auth::user()->role == 2) {
            $user = Auth::user()->student;
        }
        return Inertia::render('languages/StudyIndex', ['data' => $data, 'student' => $user]);
    }
    public function show($course, $content_id)
    {
        if (Auth::user()->role == 1) {
            $user = Auth::user()->teacher;
        } else if (Auth::user()->role == 2) {
            $user = Auth::user()->student;
        }
        $course = Course::with(['modules', 'modules.lessons', 'modules.lessons.contents', 'modules.quize', 'modules.quize.questions', 'modules.quize.questions.options'])->findOrFail($course);
        $data = Content::with(['comments', 'comments.replies', 'comments.user', 'comments.replies.user'])->findorFail($content_id);


        return Inertia::render('languages/StudyIndex', ['data' => $data, 'isresult' => false, 'student' => $user]);
    }
    public function reset_quize($course, $quize_id)
    {
        $quize = Quize::find($quize_id);
        $quize->students()->detach(Auth::user()->student);
        return redirect()->back();
    }
    public function showquize($course, $quize_id)
    {
        $quize = Quize::with(['questions', 'questions.options'])->findOrFail($quize_id);
        $course = Course::with(['modules', 'modules.lessons', 'modules.lessons.contents', 'modules.quize', 'modules.quize.questions', 'modules.quize.questions.options'])->findOrFail($course);
        // dd(Auth::user()->student->quizes()->find($quize_id)->pivot->score);

        if (Auth::user()->role == 1) {
            $user = Auth::user()->teacher;
            $isResult = false;
            $data = ['quize' => $quize];
        } else if (Auth::user()->role == 2) {
            $user = Auth::user()->student;
            if (Auth::user()->student->quizes->contains($quize->id)) {
                $isResult = true;
                $data = ['quize' => $quize, 'score' => Auth::user()->student->quizes()->find($quize_id)->pivot->score];
            } else {
                $isResult = false;
                $data = ['quize' => $quize];
            }
        }
        return Inertia::render('languages/StudyIndex', ['data' => $data, 'isresult' => $isResult, 'student' => $user]);
    }
    public function solvequize($course, $quize_id,)
    {
        $quize = Quize::with(['questions', 'questions.options'])->findOrFail($quize_id);
        $score = 0;
        $content = $quize->questions;
        foreach ($content as  $quest) {

            $datarec = $quest->id;
            if (request()->$datarec) {
                $score = $score + 1;
            };
        }
        $quize->students()->attach(Auth::user()->student, ['score' => $score]);



        return redirect()->back();
    }
    public function unenroll(Course $course)
    {


        $student = Auth::user()->student;
        $course->students()->detach($student);
        return redirect()->back();
    }
}
