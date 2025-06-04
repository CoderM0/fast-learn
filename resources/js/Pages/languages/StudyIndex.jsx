import AudioPlayer from "@/Components/AudioPlayer";
import Comment from "@/Components/Comment";
import { usePage } from "@inertiajs/react";
import StudyLayout from "../../Layouts/StudyLayout";
import QuizeResult from "../Student/QuizeResult";
import QuizeHome from "./QuizeHome";

export default function StudyIndex({ course, data, isresult }) {
    const { user } = usePage().props.auth;
    return (
        <StudyLayout course={course}>
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
                    <iframe
                        src={"/storage/" + data.filepath}
                        width="100%"
                        className="bg-red-500"
                        height="600px"
                    ></iframe>
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
                <QuizeHome
                    quize={data.quize}
                    course_id={course.id}
                    submit={user.role == 2}
                />
            )}
        </StudyLayout>
    );
}
