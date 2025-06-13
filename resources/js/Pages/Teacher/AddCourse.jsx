import CustomHead from "@/Components/CustomHead";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AddCourse({ teacher }) {
    const [newCover, setNewCover] = useState();
    const { data, setData, post, processing, progress, errors, reset } =
        useForm({
            moduleName: "",
            courseName: "",
            coursedesc: "",
            lessonTitle: "",
            contentTitle: "",
            level: "beginner",
            cover_img: "",
            lessonContent: null,
        });
    const createCourse = (e) => {
        e.preventDefault();
        post(route("teacher.save_course"));
    };
    return (
        <TeacherLayout teacher={teacher}>
            <CustomHead title={"Add Course"} />
            <div className="w-10/12 mx-auto flex justify-center p-10">
                <form className="w-full p-2 my-2" onSubmit={createCourse}>
                    <div className="my-2 mb-5 h-32">
                        <label htmlFor="cover" className="h-32">
                            {newCover ? (
                                <img
                                    src={URL.createObjectURL(newCover)}
                                    className="object-cover w-full h-full "
                                    alt=""
                                />
                            ) : (
                                <div class="flex h-32 flex-col items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-all duration-300">
                                    <svg
                                        class="w-16 h-16 text-blue-500 mb-4 transition-all duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>

                                    <input
                                        id="file-upload"
                                        type="file"
                                        class="hidden"
                                    />

                                    <label
                                        for="file-upload"
                                        class="text-gray-600 cursor-pointer text-center hover:text-blue-600 transition-all duration-300"
                                    >
                                        <span class="block text-xl font-medium">
                                            Add Cover Image
                                        </span>
                                        <span class="block text-sm text-gray-400">
                                            Drag & Drop or Click to browse
                                        </span>
                                    </label>
                                </div>
                            )}
                        </label>

                        <input
                            type="file"
                            id="cover"
                            className="hidden"
                            name="cover"
                            onChange={(e) => {
                                setData("cover_img", e.target.files[0]);
                                setNewCover(e.target.files[0]);
                            }}
                        />
                    </div>
                    <div className="flex items-center my-2 ">
                        <div className="pr-2 w-1/2">
                            <InputLabel>Course Name</InputLabel>
                            <TextInput
                                name="courseName"
                                value={data.courseName}
                                onChange={(e) =>
                                    setData("courseName", e.target.value)
                                }
                                className="w-full my-2"
                            />
                            <InputError
                                message={errors.courseName}
                                className="mt-2"
                            />
                        </div>
                        <div className="pl-2 w-1/2">
                            <InputLabel>Course Level</InputLabel>
                            <select
                                name="level"
                                value={data.level}
                                onChange={(e) =>
                                    setData("level", e.target.value)
                                }
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  w-full my-2"
                            >
                                <option value="beginner">beginner</option>
                                <option value="intermidate">
                                    intermidiate
                                </option>
                                <option value="advanced">advanced</option>
                            </select>
                            <InputError
                                message={errors.level}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <InputLabel>Description</InputLabel>
                    <TextInput
                        name="coursedesc"
                        value={data.coursedesc}
                        onChange={(e) => setData("coursedesc", e.target.value)}
                        className="w-full my-2"
                    />
                    <InputError message={errors.coursedesc} className="mt-2" />

                    <InputLabel>Add First Module Name</InputLabel>
                    <TextInput
                        name="moduleName"
                        value={data.moduleName}
                        onChange={(e) => setData("moduleName", e.target.value)}
                        className="w-full my-2"
                    />
                    <InputError message={errors.moduleName} className="mt-2" />
                    <div className="flex items-center my-2">
                        <div className="w-1/2 pr-2">
                            <InputLabel>Add First Lesson Title</InputLabel>

                            <TextInput
                                name="lessonTitle"
                                value={data.lessonTitle}
                                onChange={(e) =>
                                    setData("lessonTitle", e.target.value)
                                }
                                className="w-full my-2"
                            />
                            <InputError
                                message={errors.lessonTitle}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <InputLabel>Add Lesson content Title</InputLabel>
                            <TextInput
                                name="contentTitle"
                                onChange={(e) =>
                                    setData("contentTitle", e.target.value)
                                }
                                className="w-full my-2"
                            />
                            <InputError
                                message={errors.contentTitle}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <InputLabel>Add Lesson Content File</InputLabel>

                    <TextInput
                        name="lessonContent"
                        type="file"
                        accept="video/mp4,application/pdf,audio/mp3,audio/wav,audio/mpeg"
                        onChange={(e) =>
                            setData("lessonContent", e.target.files[0])
                        }
                        className="w-full my-2"
                    />
                    <InputError
                        message={errors.lessonContent}
                        className="mt-2"
                    />

                    <div>
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                    </div>
                    <div className="flex justify-center my-2 mt-3">
                        <PrimaryButton
                            disabled={processing}
                            className="my-2 w-1/2 justify-center"
                        >
                            Add
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </TeacherLayout>
    );
}
