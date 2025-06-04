import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";

export default function ContentForm({ course, module, lesson }) {
    const [OpenContent, setOpenContent] = useState(false);
    const { data, setData, post, reset, progress, errors, processing } =
        useForm({
            contentTitle: "",
            lessonContent: "",
        });

    const AddContent = (e) => {
        e.preventDefault();
        post(route("teacher.add_content", lesson.id));
        reset();
        if (Object.values(errors).length == 0) {
            setOpenContent(false);
        } else {
            setOpenContent(true);
        }
    };
    return (
        <>
            <div className="flex justify-between">
                <p>{lesson.title}</p>

                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setOpenContent(!OpenContent)}
                        className="text-lightbl  font-bold px-4 flex items-center gap-2"
                    >
                        Add Content{" "}
                        {OpenContent ? (
                            <IoIosArrowDown />
                        ) : (
                            <IoIosArrowForward />
                        )}
                    </button>
                    <Link
                        href={route("teacher.lesson.delete", lesson.id)}
                        method="DELETE"
                        class="font-medium border border-red-500 bg-red-500 text-white rounded-md px-4 py-1 mr-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline flex items-center gap-2"
                    >
                        Delete Lesson <MdDeleteForever />
                    </Link>
                </div>
            </div>
            <form
                onSubmit={AddContent}
                className={`${OpenContent ? "block" : "hidden"} p-2 px-4`}
            >
                <InputLabel>Add content Title</InputLabel>
                <TextInput
                    name="contentTitle"
                    value={data.contentTitle}
                    onChange={(e) => setData("contentTitle", e.target.value)}
                    className="w-full my-2"
                />
                <InputError message={errors.contentTitle} className="my-1" />

                <InputLabel>Add File</InputLabel>

                <TextInput
                    name="lessonContent"
                    type="file"
                    accept="video/mp4,application/pdf,audio/mp3,audio/wav,audio/mpeg,audio/m4a"
                    onChange={(e) =>
                        setData("lessonContent", e.target.files[0])
                    }
                    className="w-full my-2"
                />
                <InputError message={errors.lessonContent} className="my-1" />

                <div className="w-full my-1">
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                </div>
                <PrimaryButton className="my-2">Add Content</PrimaryButton>
            </form>
        </>
    );
}
