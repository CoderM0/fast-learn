import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import ContentControll from "./ContentControll";
export default function LessonControll({ lesson, index }) {
    const [OpenLesson, setOpenLesson] = useState(false);

    const { processing: processingLesson, delete: destroyLesson } = useForm();
    const deleteLesson = (lesson_id) => {
        destroyLesson(route("admin_content.delete_lesson", lesson_id));
    };
    return (
        <div className="ml-2 border-l border-gray-300 bg-gray-200 rounded-xl p-2">
            <div className="flex justify-between">
                <div className="font-bold flex items-center gap-2">
                    {index + 1}
                    {". "}
                    {lesson.title}{" "}
                    <p className="text-green-500">
                        ({lesson.contents.length} Contents)
                    </p>
                    <button onClick={() => setOpenLesson(!OpenLesson)}>
                        {OpenLesson ? (
                            <IoIosArrowDown />
                        ) : (
                            <IoIosArrowForward />
                        )}
                    </button>
                </div>
                <button
                    onClick={() => deleteLesson(lesson.id)}
                    disabled={processingLesson}
                    className="flex disabled:bg-red-300 items-center gap-2 bg-red-500 text-white p-1 rounded-lg"
                >
                    Delete Lesson
                    {processingLesson && (
                        <AiOutlineLoading3Quarters
                            className="text-green-500 animate-spin"
                            color="white"
                        />
                    )}
                </button>
            </div>

            {/* contents */}
            <div
                className={`my-2 ml-4 pl-4 border-l border-gray-300 ${
                    OpenLesson ? "block" : "hidden"
                }`}
            >
                {lesson.contents.map((content, index) => {
                    return (
                        <ContentControll
                            content={content}
                            index={index}
                            key={content.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}
