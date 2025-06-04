import CustomHead from "@/Components/CustomHead";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
export default function CourseContent({ course }) {
    console.log(course);
    const [OpenModule, setOpenModule] = useState(false);
    const [OpenLesson, setOpenLesson] = useState(false);

    const { processing: processingContent, delete: detroyContent } = useForm();
    const deleteContent = (content_id) => {
        detroyContent(route("admin_content.delete_content", content_id));
    };
    const { processing: processingLesson, delete: destroyLesson } = useForm();
    const deleteLesson = (lesson_id) => {
        destroyLesson(route("admin_content.delete_lesson", lesson_id));
    };
    const { processing: processingModule, delete: destroyModule } = useForm();
    const deleteModule = (module_id) => {
        destroyModule(route("admin_content.delete_module", module_id));
    };
    return (
        <AdminLayout>
            <CustomHead title={"Edit " + course.name + " Course"} />

            <div className="w-[100%]   max-sm:w-full mx-auto py-2 ">
                <div className="">
                    <div className="flex justify-between  my-2 bg-indigo-800 text-white p-2 rounded-t-lg">
                        <h1 className="text-center">{course.name} Modules</h1>
                    </div>
                </div>
                <ul class="bg-white shadow overflow-hidden sm:rounded-md">
                    {course.modules.map((mod) => {
                        return (
                            <div className="mb-2" key={mod.id}>
                                <div className="flex justify-between items-center p-2 bg-gray-200 shadow-lg">
                                    <div className="flex gap-2">
                                        <h1 className="font-bold flex items-center gap-2">
                                            {mod.title}
                                            <p className="text-green-500">
                                                ({mod.lessons.length} Lessons)
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setOpenModule(!OpenModule)
                                                }
                                            >
                                                {OpenModule ? (
                                                    <IoIosArrowDown />
                                                ) : (
                                                    <IoIosArrowForward />
                                                )}
                                            </button>
                                        </h1>
                                    </div>
                                    <button
                                        onClick={() => deleteModule(mod.id)}
                                        disabled={processingModule}
                                        className="flex disabled:bg-red-300 items-center gap-2 bg-red-500 text-white p-1 rounded-lg"
                                    >
                                        Delete Module
                                        {processingModule && (
                                            <AiOutlineLoading3Quarters
                                                className="text-green-500 animate-spin"
                                                color="white"
                                            />
                                        )}
                                    </button>
                                </div>
                                <div
                                    className={`my-2 p-2 shadow-lg bg-gray-100 ${
                                        OpenModule ? "block" : "hidden"
                                    }`}
                                >
                                    {mod.lessons.map((lesson, index) => {
                                        return (
                                            <div
                                                key={lesson.id}
                                                className="ml-2 border-l border-gray-300 bg-gray-200 rounded-xl p-2"
                                            >
                                                <div className="flex justify-between">
                                                    <p className="font-bold flex items-center gap-2">
                                                        {index + 1}
                                                        {". "}
                                                        {lesson.title}{" "}
                                                        <p className="text-green-500">
                                                            (
                                                            {
                                                                lesson.contents
                                                                    .length
                                                            }{" "}
                                                            Contents)
                                                        </p>
                                                        <button
                                                            onClick={() =>
                                                                setOpenLesson(
                                                                    !OpenLesson
                                                                )
                                                            }
                                                        >
                                                            {OpenLesson ? (
                                                                <IoIosArrowDown />
                                                            ) : (
                                                                <IoIosArrowForward />
                                                            )}
                                                        </button>
                                                    </p>
                                                    <button
                                                        onClick={() =>
                                                            deleteLesson(
                                                                lesson.id
                                                            )
                                                        }
                                                        disabled={
                                                            processingLesson
                                                        }
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
                                                        OpenLesson
                                                            ? "block"
                                                            : "hidden"
                                                    }`}
                                                >
                                                    {lesson.contents.map(
                                                        (content, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        content.id
                                                                    }
                                                                    className="flex justify-between items-center p-2 pr-0 bg-gray-50 rounded-sm my-2 "
                                                                >
                                                                    <p>
                                                                        {index +
                                                                            1}
                                                                        {". "}
                                                                        {
                                                                            content.title
                                                                        }{" "}
                                                                        <span className="text-green-500">
                                                                            (
                                                                            {
                                                                                content.type
                                                                            }
                                                                            )
                                                                        </span>
                                                                    </p>
                                                                    <button
                                                                        className="flex disabled:bg-red-300 items-center gap-2 bg-red-500 text-white p-1 rounded-lg"
                                                                        onClick={() =>
                                                                            deleteContent(
                                                                                content.id
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            processingContent
                                                                        }
                                                                    >
                                                                        {processingContent && (
                                                                            <AiOutlineLoading3Quarters
                                                                                className="text-green-500 animate-spin"
                                                                                color="white"
                                                                            />
                                                                        )}
                                                                        Delete
                                                                        Content
                                                                    </button>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}{" "}
                </ul>

                {/* imag */}
            </div>
        </AdminLayout>
    );
}
