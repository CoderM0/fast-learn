import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiSevenPointedStar } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import SingleReply from "./SingleReply";

export default function SingleComment({ comment }) {
    const [openReplies, setOpenReplies] = useState(false);
    const { user } = usePage().props.auth;
    const { delete: destroy, processing } = useForm();
    const { delete: destroyReply, processing: processingReply } = useForm();
    const deleteComment = (comment_id) => {
        destroy(route("user.comment.delete", comment_id), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    const deleteReply = (reply_id) => {
        destroyReply(route("user.reply.delete", reply_id), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className=" my-2">
            <div className=" text-black font-bold rounded-lg">
                <div className="rounded-xl bg-white text-black px-2 py-1 flex justify-between border-2 roundd-xl">
                    <div className="p-3">
                        <Link
                            href={route("user.show_profile", comment.user.id)}
                            className="flex gap-3 items-center"
                        >
                            <img
                                src={`/storage/${comment.user.avatar}`}
                                className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                            />
                            <h3 className="font-bold flex items-center gap-2">
                                {comment.user.name}{" "}
                                {comment.user.role == 1 ? (
                                    <div class="inline-flex items-center justify-between space-x-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm">
                                        <GiSevenPointedStar />

                                        <div class="select-none">
                                            Instructor
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <br />
                            </h3>
                        </Link>
                        <p className="text-gray-600 mt-2">
                            {comment.comment_text}
                        </p>
                    </div>

                    <div className="flex justify-end items-center gap-3">
                        <button
                            onClick={() => setOpenReplies(!openReplies)}
                            className=" p-2 rounded-xl flex items-center gap-2"
                        >
                            {comment.replies.length > 0 ? (
                                <>
                                    {openReplies
                                        ? "hide Replies"
                                        : `view ${comment.replies.length} Replies`}

                                    <svg
                                        className={`w-5 h-5 text-black transition ${
                                            openReplies
                                                ? "rotate-90 "
                                                : "rotate-0"
                                        } `}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                        ></path>
                                    </svg>
                                </>
                            ) : (
                                <button
                                    className="text-right text-blue-500"
                                    onClick={() => setOpenReplies(!openReplies)}
                                >
                                    Reply
                                </button>
                            )}
                        </button>
                        {comment.user_id == user.id && (
                            <button
                                disabled={processing}
                                onClick={() => deleteComment(comment.id)}
                                className="bg-red-500 flex items-center gap-2 text-white p-2 disabled:bg-red-300 rounded-lg"
                            >
                                <p className=""> Delete</p>{" "}
                                {processing ? (
                                    <AiOutlineLoading3Quarters
                                        size={"1.3rem"}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <MdDeleteForever size={"1.3rem"} />
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div
                    className={` mx-5 border-l-black px-2 transition-all duration-100 ${
                        openReplies ? "max-h-96" : "max-h-0"
                    }  overflow-hidden`}
                >
                    {comment.replies?.map((reply) => {
                        return (
                            <>
                                <div className="text-gray-900 font-bold pl-10">
                                    |
                                </div>
                                <div className="p-2 rounded-xl my-2 bg-white border-l-8 border-l-blue-500 border-2">
                                    <div className="flex gap-3 items-center">
                                        <Link
                                            href={route(
                                                "student.show_profile",
                                                reply.user.id
                                            )}
                                        >
                                            <img
                                                src={`/storage/${reply.user.avatar}`}
                                                className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                                            />
                                        </Link>

                                        <h3 className="font-bold flex items-center gap-2">
                                            <Link
                                                href={route(
                                                    "user.show_profile",
                                                    reply.user.id
                                                )}
                                            >
                                                {reply.user.name}{" "}
                                                {reply.user.role == 1 ? (
                                                    <div class="inline-flex items-center justify-between space-x-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm">
                                                        <GiSevenPointedStar />

                                                        <div class="select-none">
                                                            Instructor
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </Link>
                                            <span className="text-blue-400">
                                                replied to
                                            </span>{" "}
                                            <Link
                                                href={route(
                                                    "student.show_profile",
                                                    comment.user.id
                                                )}
                                            >
                                                {comment.user.name}
                                            </Link>
                                            <br />
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="pl-12 text-gray-600 mt-2">
                                            {reply.reply_text}
                                        </p>
                                        {reply.user_id == user.id && (
                                            <button
                                                disabled={processingReply}
                                                onClick={() =>
                                                    deleteReply(reply.id)
                                                }
                                                className="bg-red-500 flex items-center gap-2 text-white p-2 disabled:bg-red-300 rounded-lg"
                                            >
                                                <p className=""> Delete</p>{" "}
                                                {processingReply ? (
                                                    <AiOutlineLoading3Quarters
                                                        size={"1.3rem"}
                                                        className="animate-spin"
                                                    />
                                                ) : (
                                                    <MdDeleteForever
                                                        size={"1.3rem"}
                                                    />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>{" "}
                            </>
                        );
                    })}
                    <SingleReply comment={comment} />{" "}
                </div>
            </div>
        </div>
    );
}
