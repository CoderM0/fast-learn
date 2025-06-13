<?php

namespace App\Http\Middleware;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $sharedData = [
            'auth' => [
                'user' => $request->user() ? $request->user()->only('id', 'name', 'email', 'avatar', 'role') : null,
            ],


        ];
        if ($request->route('course')) {
            $courseId = $request->route('course');

            $sharedData['coursePlaylistData'] = cache()->remember(
                "course_layout_data_{$courseId}",
                now()->addHours(1),
                function () use ($courseId) {
                    return Course::with(['modules', 'modules.lessons', 'modules.lessons.contents', 'modules.quize', 'modules.quize.questions', 'modules.quize.questions.options'])->findOrFail($courseId)->toArray(); // Convert to array here
                }
            );
        }

        return parent::share($request) + $sharedData;
    }
}
