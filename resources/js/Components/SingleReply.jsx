import { useForm } from "@inertiajs/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import TextInput from "./TextInput";

export default function SingleReply({ comment }) {
    const {
        data: replydata,
        processing,
        setData: setReply,
        reset: resetReply,
        post: postReply,
    } = useForm({
        reply_text: "",
    });
    const addreply = (e, comment_id) => {
        e.preventDefault();
        postReply(route("courses.add_reply", comment_id), {
            preserveScroll: true,
        });
        resetReply();
    };
    return (
        <>
            {processing ? (
                <div className="w-full h-full flex justify-center items-center mt-5">
                    {" "}
                    <AiOutlineLoading3Quarters
                        className="text-green-500 animate-spin"
                        size={"5rem"}
                    />{" "}
                </div>
            ) : (
                <form
                    onSubmit={(e) => addreply(e, comment.id)}
                    className="flex items-center p-2 "
                >
                    <TextInput
                        autoComplete={false}
                        name="reply_text"
                        placeholder={`reply to ${comment.user.name} ...`}
                        value={replydata.reply_text}
                        onChange={(e) => setReply("reply_text", e.target.value)}
                        className="w-full my-2"
                    ></TextInput>
                    <button className="p-1 h-10 w-20 rounded-r-xl text-white bg-lightbl">
                        Reply
                    </button>
                </form>
            )}
        </>
    );
}
