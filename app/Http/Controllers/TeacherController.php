<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Module;
use App\Models\Option;
use App\Models\Question;
use App\Models\Quize;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $tmp = 0;
        $courses = Course::with(['students', 'students.user'])->where('teacher_id', Auth::user()->teacher->id)->get();
        foreach ($courses as $course) {

            $tmp += count($course->students);
        }

        return Inertia::render("Teacher/TeacherDashboard", ['students_total' => $tmp]);
    }
    public function courses()
    {

        $courses = Course::where('teacher_id', Auth::user()->teacher->id)->get();


        return Inertia::render("Teacher/TeacherCourses", ['courses' => $courses]);
    }
    public function add_course()
    {
        $teacher = Teacher::where("user_id", Auth::id())->first();
        if ($teacher->is_active) {
            return Inertia::render("Teacher/AddCourse");
        } else {
            return Inertia::render("Teacher/BlockedTeacher");
        }
    }
    public function save_course()
    {
        $validatedData = request()->validate([
            'courseName' => 'required',
            'lessonTitle' => 'required',
            'contentTitle' => 'required',
            'level' => 'required',
            'cover_img' => 'required|image',
            'lessonContent' => 'required',
            'coursedesc' => 'required',
            'moduleName' => 'required',
        ]);
        $cover_img_file = request()->file("cover_img");
        $course_name = request()->courseName;
        $cover_path = Storage::disk("public")->put("$course_name/cover", $cover_img_file);
        $course = Course::create([
            'name' => $validatedData['courseName'],
            'description' => $validatedData['coursedesc'],
            'level' => $validatedData['level'],
            'cover_img' => $cover_path,
            'rate' => 0,
            'teacher_id' => Auth::user()->teacher->id
        ]);
        $module = Module::create([
            'title' => $validatedData['moduleName'],
            'course_id' => $course->id
        ]);
        $lesson = Lesson::create([
            'title' => $validatedData['lessonTitle'],
            'module_id' => $module->id,
        ]);
        $lessonfile = request()->file('lessonContent');
        $lessonType = $lessonfile->guessExtension();
        $lessonfile = Storage::disk('public')->putFile("$course->name/$module->title/$lesson->title", $lessonfile);
        Content::create([
            'title' => $validatedData['contentTitle'],
            'type' => $lessonType,
            'filepath' => $lessonfile,
            'lesson_id' => $lesson->id,
        ]);

        return redirect()->route('teacher.dashboard');
    }

    public function update_cover($course)
    {
        $course = Course::find($course);

        $cover_img_file = request()->file("cover_img");
        $course_name = $course->name;

        Storage::disk("public")->delete($course->cover_img);
        $cover_path = Storage::disk("public")->put("$course_name/cover", $cover_img_file);
        $course->update(["cover_img" => $cover_path]);
        return redirect()->back();
    }
    public function edit_course($course_id)
    {
        $teacher = Teacher::where("user_id", Auth::id())->first();
        if ($teacher->is_active) {
            $course = Course::with(['modules', 'modules.lessons', 'modules.quize'])->findOrFail($course_id);

            return Inertia::render('Teacher/EditCourse', ['course' => $course]);
        } else {
            return Inertia::render("Teacher/BlockedTeacher");
        }
    }
    public function delete_course(Course $course)
    {
        $course->delete();
        return redirect()->route("teacher.courses");
    }
    public function add_module($course_id)
    {
        $validatedData = request()->validate([
            'moduleName' => 'required'
        ]);
        Module::create([
            'title' => $validatedData['moduleName'],
            'course_id' => $course_id
        ]);
        return redirect()->back();
    }
    public function delete_module(Module $module)
    {
        $module->delete();
        return redirect()->back();
    }
    public function edit_module($module_id)
    {
        return Inertia::render("Teacher/EditModule", ['module' => Module::where('id', $module_id)->with(['lessons', 'lessons.contents', 'quize'])->first()]);
    }
    public function delete_content(Content $content)
    {
        Storage::disk('public')->delete($content->filepath);
        $content->delete();
        return redirect()->back();
    }
    public function delete_lesson($lesson_id)
    {
        $lesson = Lesson::with(['module', 'module.course'])->where('id', $lesson_id)->first();
        $course_name = $lesson->module->course->name;
        $module_name = $lesson->module->title;
        Storage::disk('public')->deleteDirectory("$course_name/$module_name/$lesson->title");
        $lesson->delete();
        return redirect()->back();
    }
    public function add_lesson($module_id)
    {
        $module = Module::with('course')->where("id", $module_id)->first();
        $course_name = $module->course->name;
        $validatedData = request()->validate([
            'lessonName' => 'required',
            'contentTitle' => 'required',
            'lessonContent' => 'required',
        ]);
        $lesson = Lesson::create([
            'title' => $validatedData['lessonName'],
            'module_id' => $module_id,

        ]);
        $lessonfile = request()->file('lessonContent');
        $lessonfile = Storage::disk('public')->putFile("$course_name/$module->title/$lesson->title", $lessonfile);
        Content::create([
            'title' => $validatedData['contentTitle'],
            'type' => request()->file('lessonContent')->guessExtension(),
            'filepath' => $lessonfile,
            'lesson_id' => $lesson->id,
        ]);
        return redirect()->back();
    }
    public function add_content($lesson_id)
    {
        $lesson = Lesson::with(['module', 'module.course'])->where('id', $lesson_id)->first();
        $course_name = $lesson->module->course->name;
        $module_name = $lesson->module->title;

        $validatedData = request()->validate([
            'contentTitle' => 'required',
            'lessonContent' => 'required',
        ]);
        $lessonfile = request()->file('lessonContent');
        $lessonfile = Storage::disk('public')->putFile("$course_name/$module_name/$lesson->title", $lessonfile);
        Content::create([
            'title' => $validatedData['contentTitle'],
            'type' => request()->file('lessonContent')->guessExtension(),
            'filepath' => $lessonfile,
            'lesson_id' => $lesson_id,
        ]);
        return redirect()->back();
    }

    public function add_quize($module_id)
    {

        $validated = request()->validate([
            'quizeName' => "required"
        ]);
        $quize = Quize::create([
            'name' => $validated['quizeName'],
            'module_id' => $module_id
        ]);

        return redirect()->route('teacher.add_question.create', $quize->id);
    }
    public function add_question($quize_id)
    {

        return Inertia::render("Teacher/AddQuize", ['quize' => Quize::with(['questions'])->findOrFail($quize_id)]);
    }

    public function save_question($quize_id)
    {
        $validated = request()->validate([
            "question_text" => "required",
            "opt_one" => "required",
            "opt_two" => "required",
            "opt_three" => "required",
            "opt_four" => "required",
            "is_one_correct" => "required",
            "is_two_correct" => "required",
            "is_three_correct" => "required",
            "is_four_correct" => "required",
        ]);
        $question = Question::create([
            "question_text" => $validated['question_text'],
            "quize_id" => $quize_id
        ]);
        $optionsgroup = [
            ["option_text" => $validated['opt_one'], "is_correct" => $validated['is_one_correct'], "question_id" => $question->id],
            ["option_text" => $validated['opt_two'], "is_correct" => $validated['is_two_correct'], "question_id" => $question->id],
            ["option_text" => $validated['opt_three'], "is_correct" => $validated['is_three_correct'], "question_id" => $question->id],
            ["option_text" => $validated['opt_four'], "is_correct" => $validated['is_four_correct'], "question_id" => $question->id],
        ];
        Option::insert($optionsgroup);

        return redirect()->back();
    }

    public function view_students()
    {
        $courses = Course::with(['students', 'students.user'])->where('teacher_id', Auth::user()->teacher->id)->get();
        return Inertia::render("Teacher/ViewStudents", ['courses' => $courses]);
    }

    public function unenroll_student(Course $course, Student $student)
    {
        $course->students()->detach($student);
        return redirect()->back();
    }
    public function view_profile()
    {
        $teacher = Teacher::with('user')->where('user_id', Auth::id())->first();
        return Inertia::render("Teacher/ViewTeacherProfile", ['teacher_pro' => $teacher]);
    }
    public function edit_personal_info()
    {
        $teacher = Teacher::with('user')->where('user_id', Auth::id())->first();
        return Inertia::render("Teacher/EditTeacherPersonalInfo", ['teacher' => $teacher]);
    }
    public function  update_personal_info()
    {
        $teacher = Teacher::where("user_id", Auth::id())->first();
        $user = $teacher->user;
        $validated_teacher = request()->validate([
            'license' => 'sometimes',
            'expertise' => 'sometimes',
            'biography' => 'sometimes',
            'full_name' => 'sometimes|string|max:255',

        ]);
        request()->validate(['avatar' => 'sometimes|image']);
        $teacher->update($validated_teacher);
        if (request()->file('avatar')) {
            Storage::disk('public')->delete($teacher->avatar);
            $new_avatar = Storage::disk('public')->put('teachers', request()->file('avatar'));
            $user->avatar = $new_avatar;
            $user->save();
        }

        $validated_user = request()->validate([
            'email' => 'sometimes|string|lowercase|email|max:255',

        ]);
        $user = User::find($teacher->user_id);
        $user->update([...$validated_user, 'name' => request()->full_name]);

        return redirect()->route('teacher.view_profile');
    }
}
