import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import ContentForm from "./ContentForm";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";

export default function Accordion({ module, course }) {
    const [open, setOpen] = useState(false);
    const [OpenLesson, setOpenLesson] = useState(false);

    const { data, setData, post, reset, progress, errors } = useForm({
        lessonName: "",
        lessonType: "pdf",
        contentTitle: "",
        lessonContent: "",
    });
    const { post: postQuize } = useForm({
        quizeName: module.title + " Quize",
    });
    const AddLesson = (e) => {
        e.preventDefault();
        post(route("admin.addlesson", [course.id, module.id]));
        reset();
        if (errors.length == 0) {
            setOpenLesson(false);
        } else {
            setOpenLesson(true);
        }
    };
    const addQuize = (e) => {
        e.preventDefault();
        postQuize(route("admin.addquize.store", [module.id]));
    };
    return (
        <div className=" mx-auto bg-gray-200 border rounded-xl my-1">
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer select-none p-3 my-2 text-center flex justify-between"
            >
                <p>{module.title}</p>

                <svg
                    class={`w-5 h-5 text-gray-500 transition ${
                        open ? "rotate-90 " : "rotate-0"
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
            </div>
            <div
                className={`  transition-all duration-300  ${
                    open ? "max-h-[1000px]" : "max-h-0 "
                } overflow-hidden `}
            >
                <div className="flex justify-between pr-2">
                    <button
                        onClick={() => setOpenLesson(!OpenLesson)}
                        className="text-lightbl font-bold px-4"
                    >
                        Add Lesson +
                    </button>
                    {module.quize ? (
                        <Link
                            href={route(
                                "admin.addquestion.create",
                                module.quize.id
                            )}
                        >
                            Edit Quize
                        </Link>
                    ) : (
                        <form onSubmit={addQuize}>
                            <PrimaryButton className="text-borange">
                                Add Quize{" "}
                            </PrimaryButton>
                        </form>
                    )}
                </div>

                <form
                    onSubmit={AddLesson}
                    className={`${OpenLesson ? "block" : "hidden"} p-2 px-4`}
                >
                    <InputLabel>Lesson Title</InputLabel>
                    <TextInput
                        name="lessonName"
                        value={data.lessonName}
                        onChange={(e) => setData("lessonName", e.target.value)}
                        className="w-full my-2"
                    />
                    <InputError message={errors.lessonName} className="mt-2" />

                    <InputLabel>Lesson Type</InputLabel>
                    <select
                        onChange={(e) => setData("lessonType", e.target.value)}
                        id="types"
                        value={data.lessonType}
                        className="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="pdf">PDF</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                    </select>
                    <InputLabel>Add content Title</InputLabel>
                    <TextInput
                        name="contentTitle"
                        value={data.contentTitle}
                        onChange={(e) =>
                            setData("contentTitle", e.target.value)
                        }
                        className="w-full my-2"
                    />
                    <InputError
                        message={errors.contentTitle}
                        className="mt-2"
                    />

                    <InputLabel>Add Lesson Content</InputLabel>

                    <TextInput
                        name="lessonContent"
                        type="file"
                        onChange={(e) =>
                            setData("lessonContent", e.target.files[0])
                        }
                        className="w-full my-2"
                    />
                    <InputError
                        message={errors.lessonContent}
                        className="mt-2"
                    />

                    <div className="w-full my-1">
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                    </div>
                    <PrimaryButton>Add</PrimaryButton>
                </form>
                <div className="p-4 rounded-lg ">
                    {module.lessons.map((el) => {
                        return (
                            <div className="bg-gray-100 flex-grow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full my-2 ">
                                <ContentForm
                                    course={course}
                                    module={module}
                                    lesson={el}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
