<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Module;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminContentController extends Controller
{
    public function all_courses()
    {
        $teachers = Teacher::with(['courses', 'user'])->get();
        return Inertia::render("admin/AdminContent/AdminAllCourses", ['teachers' => $teachers]);
    }
    public function course_content($course_id)
    {
        $course = Course::with(['modules', 'modules.lessons', 'modules.lessons.contents', 'modules.quize', 'modules.quize.questions', 'modules.quize.questions.options'])->where('id', $course_id)->first();
        return Inertia::render("admin/AdminContent/CourseContent", ['course' => $course]);
    }
    public function delete_content(Content $content)
    {
        Storage::disk('public')->delete($content->filepath);
        $content->delete();
        return redirect()->back();
    }
    public function delete_Lesson($lesson_id)
    {
        $lesson = Lesson::with(['module', 'module.course'])->where('id', $lesson_id)->first();
        $course_name = $lesson->module->course->name;
        $module_name = $lesson->module->title;
        Storage::disk('public')->deleteDirectory("$course_name/$module_name/$lesson->title");
        $lesson->delete();
        return redirect()->back();
    }
    public function delete_module(Module $module)
    {
        $module->delete();
        return redirect()->back();
    }
    public function delete_course(Course $course)
    {
        $course->delete();
        return redirect()->back();
    }
}
