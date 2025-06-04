import ContentForm from "@/Components/ContentForm";
import CustomHead from "@/Components/CustomHead";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

export default function EditModule({ teacher, module }) {
    console.log(module);
    const [OpenLesson, setOpenLesson] = useState(false);

    const { data, setData, post, reset, progress, errors, processing } =
        useForm({
            lessonName: "",
            contentTitle: "",
            lessonContent: "",
        });
    const AddLesson = (e) => {
        e.preventDefault();
        post(route("teacher.add_lesson", module.id));
        reset();
        if (Object.values(errors).length == 0) {
            setOpenLesson(false);
        } else {
            setOpenLesson(true);
        }
    };
    // const addQuize = (e) => {
    //     e.preventDefault();
    //     postQuize(route("teacher.add_quize", module.id));
    // };
    return (
        <TeacherLayout teacher={teacher}>
            <CustomHead title={"Edit " + module.title + " Module"} />
            <h1 className="text-3xl font-bold">Edit {module.title}</h1>
            <p className="flex items-center gap-3 w-1/3">
                <p>{module.lessons_number} Lessons</p>
            </p>
            <div className="flex justify-between pr-2 mt-5">
                <button
                    onClick={() => setOpenLesson(!OpenLesson)}
                    className="text-lightbl font-bold px-4 "
                >
                    Add Lesson +
                </button>
                {module.quize ? (
                    <Link
                        className="px-3 py-1 bg-yellow-700 text-white rounded-lg"
                        href={route(
                            "teacher.add_question.create",
                            module.quize.id
                        )}
                    >
                        Edit Quize
                    </Link>
                ) : (
                    <Link
                        href={route("teacher.add_quize", module.id)}
                        method="POST"
                        data={{ quizeName: `${module.title}-quize` }}
                    >
                        <PrimaryButton className="text-borange">
                            Add Quize{" "}
                        </PrimaryButton>
                    </Link>
                )}
            </div>
            {processing ? (
                <div className="w-full h-full flex justify-center items-center">
                    {" "}
                    <AiOutlineLoading3Quarters
                        className="text-green-500 animate-spin"
                        size={"5rem"}
                    />{" "}
                </div>
            ) : (
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
                        accept="video/mp4, application/pdf, audio/mp3,audio/wav ,audio/mpeg"
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
            )}
            <div className="p-4 rounded-lg ">
                {module.lessons.map((el) => {
                    return (
                        <div className="bg-gray-100 flex-grow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full my-2 ">
                            <ContentForm module={module} lesson={el} />
                            <div className="my-2 mt-4">
                                {el.contents.map((cont, index) => {
                                    return (
                                        <p
                                            className="pl-4 bg-white text-green-500 py-2 my-1 flex items-center justify-between"
                                            key={cont.id}
                                        >
                                            <span>
                                                {index + 1}.{cont.title}
                                            </span>

                                            <Link
                                                href={route(
                                                    "teacher.content.delete",
                                                    cont.id
                                                )}
                                                method="DELETE"
                                                class="font-medium border border-red-500 bg-red-500 text-white rounded-md px-4 py-1 mr-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline flex items-center gap-2"
                                            >
                                                <MdDeleteForever />
                                            </Link>
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </TeacherLayout>
    );
}
