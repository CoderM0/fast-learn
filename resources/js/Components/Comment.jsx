import { useForm } from "@inertiajs/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SingleComment from "./SingleComment";
import TextInput from "./TextInput";

export default function Comment({ comments, content_id }) {
    const { data, setData, reset, post, processing } = useForm({
        comment_text: "",
    });

    const addComment = (e) => {
        e.preventDefault();
        post(route("courses.add_comment", content_id), {
            preserveScroll: true,
        });
        reset();
    };

    return (
        <div>
            <form onSubmit={addComment} className="flex items-center">
                <TextInput
                    name="comment_text"
                    autoComplete={false}
                    placeholder="Add comment..."
                    value={data.comment_text}
                    onChange={(e) => setData("comment_text", e.target.value)}
                    className="w-full my-2"
                ></TextInput>
                <button className="p-1 h-10 w-20 rounded-r-xl text-white bg-lightbl ">
                    Add{" "}
                </button>
            </form>
            {processing ? (
                <div className="w-full h-full flex justify-center items-center mt-5">
                    {" "}
                    <AiOutlineLoading3Quarters
                        className="text-green-500 animate-spin"
                        size={"5rem"}
                    />{" "}
                </div>
            ) : (
                <div class="w-fullbg-white rounded-lg border p-1 md:p-3 ">
                    <h3 class="font-semibold p-1">Discussion</h3>
                    {comments.map((comment) => {
                        return <SingleComment comment={comment} />;
                    })}
                </div>
            )}
        </div>
    );
}
