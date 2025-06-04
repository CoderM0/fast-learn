<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Reply;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function add_comment($content_id)
    {

        if (Auth::user()->role == 1) {
            $teacher = Teacher::where("user_id", Auth::id())->first();
            if (!$teacher->is_active) {
                return redirect()->route("teacher.add_course");
            }
        }
        $validated = request()->validate([
            'comment_text' => 'required'
        ]);
        Comment::create([
            'comment_text' => $validated['comment_text'],
            'user_id' => Auth::id(),
            'content_id' => $content_id,
        ]);
        return redirect()->back();
    }
    public function add_reply($comment_id)
    {
        $validated = request()->validate([
            'reply_text' => 'required'
        ]);
        Reply::create([
            'reply_text' => $validated['reply_text'],
            'user_id' => Auth::id(),
            'comment_id' => $comment_id,
        ]);
        return redirect()->back();
    }
    public function delete_comment(Comment $comment)
    {
        if (Auth::id() == $comment->user_id) {
            $comment->delete();
        } else {
            abort("No Authorized");
        }
    }
    public function delete_reply(Reply $reply)
    {
        if (Auth::id() == $reply->user_id) {
            $reply->delete();
        } else {
            abort("No Authorized");
        }
    }
}
