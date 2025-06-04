<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Auth\Events\Registered;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'avatar' => 'required|image'
        ]);
        if ($request->role == 2) {
            $request->validate(['phone_number' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10']);
            $avatar = request()->file('avatar');
            $avatarPath = Storage::disk('public')->put('students/', $avatar);
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'avatar' => $avatarPath,
                'password' => Hash::make($request->password),
            ]);

            Student::create([
                'full_name' => request()->name,
                'phone_number' => request()->phone_number,
                'user_id' => $user->id,

            ]);
        } else {
            $request->validate([
                'license' => 'required',
                'avatar' => 'required|image',
                'expertise' => 'required',
                'bio' => 'required',
            ]);
            $avatar = request()->file('avatar');
            $avatarPath = Storage::disk('public')->put('teachers/', $avatar);
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'avatar' => $avatarPath,
                'password' => Hash::make($request->password),
            ]);

            Teacher::create([
                'full_name' => request()->name,
                'license' => request()->license,
                'user_id' => $user->id,
                'expertise' => request()->expertise,
                'biography' => request()->bio,
            ]);
        }


        event(new Registered($user));

        Auth::login($user);
        if (request()->role == 1) {
            return redirect(route('teacher.dashboard', absolute: false));
        } else {
            return redirect(route('student.dashboard', absolute: false));
        }
    }
}
