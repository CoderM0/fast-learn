<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $teachers_num = count(Teacher::all()->pluck("id"));
        $students_num = count(Student::all()->pluck("id"));
        $courses_num = count(Course::all()->pluck("id"));
        $data = ['teachers_num' => $teachers_num, 'students_num' => $students_num, 'courses_num' => $courses_num];
        return Inertia::render('admin/Dashboard', ['nums' => $data]);
    }

    ///students
    public function manage_students()
    {

        return Inertia::render('admin/StudentsTable', ['students' => Student::with(["user", 'courses'])->get()]);
    }

    public function add_student()
    {

        return Inertia::render('admin/AddStudent');
    }
    public function save_student()
    {
        request()->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
            'phone_number' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'avatar' => 'required|image',
        ]);

        $avatar = request()->file('avatar');
        $avatarPath = Storage::disk('public')->put('students/', $avatar);
        $user = User::create([
            'name' => request()->full_name,
            'email' => request()->email,
            'role' => 2,
            'avatar' => $avatarPath,
            'password' => Hash::make(request()->password),
        ]);
        Student::create([
            'full_name' => request()->full_name,
            'phone_number' => request()->phone_number,
            'user_id' => $user->id,

        ]);

        return redirect()->route('admin.manage_students');
    }

    public function edit_student($student)
    {

        return Inertia::render('admin/EditStudent', ['student' => Student::with("user")->find($student)]);
    }
    public function update_student(Student $student)
    {
        $validated_student = request()->validate([
            'full_name' => 'sometimes|string',
            'phone_number' => 'sometimes|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
        ]);
        $user = User::find($student->user_id);
        $student->update($validated_student);
        if (request()->file('avatar')) {
            Storage::disk('public')->delete($student->avatar);
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
    public function delete_student(Student $student)
    {

        $user = User::find($student->user_id);

        $user->delete();
        return redirect()->back();
    }


    ///teachers Management
    public function manage_teachers()
    {

        return Inertia::render('admin/TeachersTable', ['teachers' => Teacher::with(["user", 'courses'])->get()]);
    }
    public function add_teacher()
    {

        return Inertia::render('admin/AddTeacher');
    }
    public function edit_teacher($teacher)
    {
        $teacher = Teacher::with('user')->find($teacher);
        return Inertia::render('admin/EditTeacher', ['teacher' => $teacher]);
    }
    public function update_teacher(Teacher $teacher)
    {
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

        return redirect()->route('admin.manage_teachers');
    }
    public function delete_teacher(Teacher $teacher)
    {

        $user = User::find($teacher->user_id);
        $user->delete();
        return redirect()->back();
    }
    public function save_teacher()
    {
        request()->validate([
            'license' => 'required',
            'avatar' => 'required|image',
            'expertise' => 'required',
            'bio' => 'required',
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);
        $avatar = request()->file('avatar');
        $avatarPath = Storage::disk('public')->put('teachers/', $avatar);
        $user = User::create([
            'name' => request()->name,
            'email' => request()->email,
            'role' => 1,
            'avatar' => $avatarPath,
            'password' => Hash::make(request()->password),
        ]);

        Teacher::create([
            'full_name' => request()->name,
            'license' => request()->license,
            'user_id' => $user->id,
            'expertise' => request()->expertise,
            'biography' => request()->bio,
        ]);
        return redirect()->route("admin.manage_teachers");
    }
    public function block_teacher(Teacher $teacher)
    {
        if ($teacher->is_active) {
            $teacher->update(['is_active' => false]);
        } else {
            $teacher->update(['is_active' => true]);
        }

        return redirect()->back();
    }











    //another stuff
    public function create_question($quize_id)
    {

        return Inertia::render('admin/CreateQuize', ['quize' => Quize::with(['questions'])->findOrFail($quize_id)]);
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

        return redirect()->route('admin.addquestion.create', $quize->id);
    }
    public function add_question($quize_id)
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
}
