<?php

use App\Http\Controllers\Admin\AdminContentController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\ProfileController;


use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudyController;
use App\Http\Controllers\TeacherController;


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(AdminController::class)->prefix('admin')->middleware(['auth', 'rolemanager:admin'])->group(function () {
    Route::get('/dashboard', 'index')->name('admin.dashboard');
    Route::get('/teachers/add', 'add_teacher')->name('admin.add_teacher');
    Route::post('/teachers/save', 'save_teacher')->name('admin.save_teacher');
    Route::delete('/teachers/{teacher}/delete', 'delete_teacher')->name('admin.teacher.destroy');
    Route::delete('/students/{student}/delete', 'delete_student')->name('admin.student.destroy');
    Route::get('/students/manage', 'manage_students')->name('admin.manage_students');
    Route::get('/students/add', 'add_student')->name('admin.add_student');
    Route::post('/students/save', 'save_student')->name('admin.save_student');
    Route::get('/students/{student}/edit', 'edit_student')->name('admin.edit_student');
    Route::post('/students/{student}/update', 'update_student')->name('admin.update_student');
    Route::get('/teachers/manage', 'manage_teachers')->name('admin.manage_teachers');
    Route::get('/teachers/{teacher}/edit', 'edit_teacher')->name('admin.edit_teacher');
    Route::post('/teachers/{teacher}/block', 'block_teacher')->name('admin.block_teacher');
    Route::post('/teachers/{teacher}/update', 'update_teacher')->name('admin.update_teacher');


    Route::get('/course/{quize_id}/create_question', 'create_question')->name('admin.addquestion.create');
    Route::post('/course/{quize_id}/add_question', 'add_question')->name('admin.addquestion');
    Route::post('/course/{module_id}/addquize', 'add_quize')->name('admin.addquize.store');
});
Route::controller(AdminContentController::class)->prefix('admin/content')->middleware(['auth', 'rolemanager:admin'])->group(function () {
    Route::get("courses", 'all_courses')->name("admin_content.courses.index");
    Route::get("courses/{course_id}/content", 'course_content')->name("admin_content.course.view");
    Route::delete("content/{content}/delete", 'delete_content')->name("admin_content.delete_content");
    Route::delete("lessons/{lesson_id}/delete", 'delete_lesson')->name("admin_content.delete_lesson");
    Route::delete("modules/{module}/delete", 'delete_module')->name("admin_content.delete_module");
    Route::delete("courses/{course}/delete", 'delete_course')->name("admin_content.delete_course");
});
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),

    ]);
});
Route::middleware(['auth', 'verified'])->group(function () {



    Route::controller(StudyController::class)->middleware(['auth', 'can:enrolled,course'])->group(function () {
        Route::get('courses/{course}/index', 'index')->name('courses.enrolled.index');
        Route::get('courses/{course}/lesson/{content_id}', 'show')->name('courses.enrolled.show');
        Route::get('/{course}/quize/{quize_id}', 'showquize')->name('courses.enrolled.show.quize');
        Route::delete('/{course}/quize/{quize_id}/reset', 'reset_quize')->name('quize.reset');
    });
    // Route::get('/courses/{course}/lessons/{lesson}/content/{content}', [ContentController::class, 'show'])
    //     ->name('content.show');
    Route::controller(CommentController::class)->middleware(['auth'])->group(function () {
        Route::delete("/comments/{comment}/delete", 'delete_comment')->name("user.comment.delete");
        Route::delete("/replies/{reply}/delete", 'delete_reply')->name("user.reply.delete");

        Route::post('/{content_id}/add-comment', 'add_comment')->name('courses.add_comment');
        Route::post('/{comment_id}/add-reply', 'add_reply')->name('courses.add_reply');
    });
    Route::controller(CoursesController::class)->prefix('courses')->name('courses.')->middleware(['auth', 'rolemanager:student'])->group(function () {

        Route::get('/', 'index')->name('index');
        Route::get('/{id}', 'show')->name('show');
        Route::post("/addrate/{course_id}", 'add_rate')->name("addrate");
        Route::post('/{id}', 'enroll')->name('enroll');

        Route::controller(StudyController::class)->prefix('enrolled')->middleware(['can:enrolled,course'])->group(function () {
            // Route::get('/{course}/index', 'index')->name('enrolled.index');
            // Route::get('/{course}/lesson/{content_id}', 'show')->name('enrolled.show');
            // Route::get('/{course}/quize/{quize_id}', 'showquize')->name('enrolled.show.quize');
            Route::post('/{course}/unenroll', 'unenroll')->name('enrolled.unenroll');

            Route::post('/quize/{course}/{quize_id}', 'solvequize')->name('quize.solve');
        });
    });


    Route::middleware(['auth', 'rolemanager:student'])->prefix('/student')->group(function () {
        Route::controller(StudentController::class)->group(function () {
            Route::get('/dashboard', 'index')->name('student.dashboard');
            Route::get('/courses', 'view_all_courses')->name('student.all_courses');
            Route::get('/courses/{course_id}', 'view_course')->name('student.show_course');
            Route::get("/students/view", 'view_profile')->name('student.show_profile');
            Route::get("/students/profile/edit", 'edit_student_personal')->name('student.edit_personal');
            Route::post("/students/profile/update", 'update_student_personal')->name('student.update_personal');

            Route::controller(CoursesController::class)->group(function () {
                Route::post("courses/{course}/enroll", 'enroll')->name("student.course.enroll");
            });
        });
    });
    Route::middleware('auth')->group(function () {
        Route::get("/users/{user}/profile", [ProfileController::class, 'show_profile'])->name("user.show_profile");
    });
    Route::middleware(['auth', 'rolemanager:teacher'])->prefix('/teacher')->group(function () {
        Route::controller(TeacherController::class)->group(function () {
            Route::get('/dashboard', 'index')->name('teacher.dashboard');
            Route::get('/courses', 'courses')->name('teacher.courses');
            Route::get('/profile/view', 'view_profile')->name('teacher.view_profile');
            Route::get('/profile/personal/edit', 'edit_personal_info')->name('teacher.profile.edit_personal');
            Route::post('/profile/personal/update', 'update_personal_info')->name('teacher.profile.update_personal');
            Route::delete('/courses/{course}/delete', 'delete_course')->name('teacher.delete_course');
            Route::get('/courses/add', 'add_course')->name('teacher.add_course');
            Route::post('/courses/save', 'save_course')->name('teacher.save_course');
            Route::post('/courses/{course_id}/cover/update', 'update_cover')->name('teacher.update_cover');
            Route::get('/courses/{course_id}/edit', 'edit_course')->name('teacher.edit_course');
            Route::post('/courses/{course_id}/add-module', 'add_module')->name('teacher.course.add_module');
            Route::delete('/modules/{module}/delete', 'delete_module')->name('teacher.delete_module');
            Route::delete('/contents/{content}/delete', 'delete_content')->name('teacher.content.delete');
            Route::delete('/lesson/{lesson_id}/delete', 'delete_lesson')->name('teacher.lesson.delete');
            Route::get('/modules/{module_id}/edit', 'edit_module')->name('teacher.modules.edit');
            Route::post('/modules/{module_id}/add-lesson', 'add_lesson')->name('teacher.add_lesson');
            Route::post('/lessons/{lesson_id}/add-content', 'add_content')->name('teacher.add_content');
            Route::post('/modules/{module_id}/add-quize', 'add_quize')->name('teacher.add_quize');
            Route::get('/modules/{quize_id}/add-question', 'add_question')->name('teacher.add_question.create');
            Route::post('/modules/{quize_id}/save-question', 'save_question')->name('teacher.add_question.store');
            Route::get('/students', 'view_students')->name('teacher.get_students');
            Route::post('courses/{course}/students/{student}/remove', 'unenroll_student')->name('teacher.remove_students');
        });
    });



    Route::get('/dashboard', function () {
        return redirect()->route("student.dashboard");
    })->middleware(['auth', 'verified', 'rolemanager:user'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});
require __DIR__ . '/auth.php';
