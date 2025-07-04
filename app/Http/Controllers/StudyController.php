<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Course;
use App\Models\Quize;
use App\Models\QuizeStudent;
use App\Models\Student;
use App\Models\StudentAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Inertia\Inertia;

class StudyController extends Controller
{
    public function index($course)
    {


        // return redirect()->route("content.show", [$course->id, $course->modules[0]->lessons[0]->id, $course->modules[0]->lessons[0]->contents[0]->id]);
        $data = "index";
        // if (Auth::user()->role == 1) {
        //     $user = Auth::user()->teacher;
        // } else if (Auth::user()->role == 2) {
        //     $user = Auth::user()->student;
        // }
        return Inertia::render('languages/StudyIndex', ['data' => $data]);
    }
    public function show($course, $content_id)
    {
        // if (Auth::user()->role == 1) {
        //     $user = Auth::user()->teacher;
        // } else if (Auth::user()->role == 2) {
        //     $user = Auth::user()->student;
        // }

        $data = Content::with(['comments', 'comments.replies', 'comments.user', 'comments.replies.user'])->findorFail($content_id);


        return Inertia::render('languages/StudyIndex', ['data' => $data, 'isresult' => false]);
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
                // $quize_student=QuizeStudent::where("student_id",Auth::user()->student->id)->where("quize_id",$quize_id)->first();
                $quize_student = QuizeStudent::where('student_id', Auth::user()->student->id)->where("quize_id", $quize_id)->first();

                $stuAnswers = StudentAnswer::where('quize_student_id', $quize_student->id)->get()->keyBy("question_id");
                $data = ['quize' => $quize, 'score' => $quize_student->score, 'stuanswers' => $stuAnswers];
            } else {
                $isResult = false;
                $data = ['quize' => $quize];
            }
        }
        return Inertia::render('languages/StudyIndex', ['data' => $data, 'isresult' => $isResult, 'student' => $user]);
    }
    public function solvequize($course, $quize_id)
    {
        // $quize = Quize::with(['questions', 'questions.options'])->findOrFail($quize_id);
        $score = 0;

        // $quize->students()->attach(Auth::user()->student, ['score' => $score]);
        $quize_student =  QuizeStudent::create([
            'student_id' => Auth::user()->student->id,
            'quize_id' => $quize_id,
            'score' => $score,
        ]);
        $studentAnswers = request()->all();

        $pattern = '/^q(\d+)$/';
        $valuePattern = '/^o(\d+)-is_cor-(\d+)$/';

        foreach ($studentAnswers as $key => $value) {
            if (preg_match($pattern, $key, $keyMatches)) {


                $questionId = (int)$keyMatches[1];
                if (preg_match($valuePattern, $value, $valueMatches)) {
                    $optionId = (int)$valueMatches[1];
                    $isCorrect = (int)$valueMatches[2];


                    if ($isCorrect == 1) {
                        $score++;
                    }

                    StudentAnswer::create([
                        'quize_student_id' => $quize_student->id,
                        'question_id' => $questionId,
                        'option_id' => $optionId,
                        'is_correct_answer' => $isCorrect,

                    ]);
                }
            }
        }
        $quize_student->update(['score' => $score]);
        return redirect()->back();
    }
    public function unenroll($course)
    {

        $course = Course::find($course);
        $student = Auth::user()->student;
        $course->students()->detach($student);
        return redirect()->back();
    }
}
