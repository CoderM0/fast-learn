import AudioPlayer from "@/Components/AudioPlayer";
import Comment from "@/Components/Comment";
import { usePage } from "@inertiajs/react";
import StudyLayout from "../../Layouts/StudyLayout";
import QuizeResult from "../Student/QuizeResult";
import QuizeForm from "./QuizeForm";

export default function StudyIndex({ data, isresult }) {
    const { user } = usePage().props.auth;
    console.log(user);
    const { coursePlaylistData } = usePage().props;
    return (
        <>
            {isresult ? (
                <QuizeResult data={data} />
            ) : data == "index" ? (
                <div className="w-full h-full flex justify-center items-center">
                    Choose a lesson{" "}
                </div>
            ) : data.type == "mp4" ? (
                <div>
                    <video src={"/storage/" + data.filepath} controls></video>
                    <Comment
                        content_id={data.id}
                        comments={data.comments}
                    ></Comment>
                </div>
            ) : data.type == "pdf" ? (
                <div>
                    <object
                        data={"/storage/" + data.filepath}
                        width="100%"
                        className="bg-gray-200"
                        height="600px"
                        datatype="application/pdf"
                    >
                        <p className="text-2xl text-center py-6 text-red-500 ">
                            {" "}
                            sorry! ..this file might be corrupted
                        </p>
                    </object>
                    <Comment
                        content_id={data.id}
                        comments={data.comments}
                    ></Comment>
                </div>
            ) : data.type == "mp3" ||
              data.type == "wav" ||
              data.type == "m4a" ||
              data.type == "ogg" ||
              data.type == "mpeg" ? (
                <div>
                    <AudioPlayer audio={data.filepath} title={data.title} />
                    <Comment comments={data.comments} content_id={data.id} />
                </div>
            ) : (
                <QuizeForm
                    quize={data.quize}
                    course_id={coursePlaylistData.id}
                    submit={user.role == 2}
                />
            )}
        </>
    );
}
StudyIndex.layout = (page) => (
    <StudyLayout children={page} course={page.props.coursePlaylistData} />
);
