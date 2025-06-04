import CourseModule from "@/Components/CourseModule";
import CustomHead from "@/Components/CustomHead";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDeleteForever, MdFileDownloadDone } from "react-icons/md";
import { RiImageEditFill } from "react-icons/ri";

export default function EditCourse({ course, teacher }) {
    const [OpenModule, setOpenModule] = useState(false);
    const [NewCover, setNewCover] = useState();
    const { post: sendimg, data: img_data, setData: setImgData } = useForm();
    const { data, setData, post, reset, errors, processing } = useForm({
        moduleName: "",
    });
    const Addmodule = (e) => {
        e.preventDefault();
        post(route("teacher.course.add_module", course.id));
        reset();
        setOpenModule(false);
    };
    const update_cover = () => {
        if (img_data.cover_img) {
            sendimg(route("teacher.update_cover", course.id), {
                onSuccess: () => setNewCover(null),
            });
        } else {
            console.log(img_data);
        }
    };
    return (
        <TeacherLayout teacher={teacher}>
            <CustomHead title={"Edit " + course.name + " Course"} />
            {processing ? (
                <div className="w-full h-full flex justify-center items-center">
                    {" "}
                    <AiOutlineLoading3Quarters
                        className="text-green-500 animate-spin"
                        size={"5rem"}
                    />{" "}
                </div>
            ) : (
                <div className="w-[100%]   max-sm:w-full mx-auto py-2 ">
                    <div className="">
                        <div className="flex justify-between  my-2 bg-lightbl text-white p-2 rounded-t-lg">
                            <h1 className="text-center">{course.name}</h1>
                            <button onClick={() => setOpenModule(!OpenModule)}>
                                Add Module
                            </button>
                        </div>

                        <form
                            onSubmit={Addmodule}
                            className={`${OpenModule ? "block" : "hidden"} `}
                        >
                            <InputLabel>Module Name</InputLabel>
                            <TextInput
                                name="moduleName"
                                value={data.moduleName}
                                onChange={(e) =>
                                    setData("moduleName", e.target.value)
                                }
                                className="w-full my-2"
                            />
                            <InputError
                                message={errors.moduleName}
                                className="mt-2"
                            />

                            <PrimaryButton>Add</PrimaryButton>
                        </form>
                    </div>
                    <ul class="bg-white shadow overflow-hidden sm:rounded-md">
                        {course.modules.map((mod) => {
                            return (
                                <CourseModule
                                    module={mod}
                                    course={course}
                                ></CourseModule>
                            );
                        })}{" "}
                    </ul>

                    {/* imag */}
                </div>
            )}
            <p className="border-t w-full h-1 mt-5"></p>
            <div className="rounded-xl h-32 py-2 my-5">
                <label
                    htmlFor="cover"
                    className="flex w-full gap-2 items-center my-2 cursor-pointer"
                >
                    update course image <RiImageEditFill size={"1.2rem"} />
                </label>
                <img
                    src={
                        NewCover
                            ? URL.createObjectURL(NewCover)
                            : `/storage/${course.cover_img}`
                    }
                    className="object-cover w-full h-full rounded-xl"
                    alt=""
                />
                <input
                    type="file"
                    name="cover"
                    className="hidden"
                    accept="image/*"
                    id="cover"
                    onChange={(e) => {
                        setImgData("cover_img", e.target.files[0]);
                        setNewCover(e.target.files[0]);
                    }}
                />
                {NewCover && (
                    <button
                        onClick={update_cover}
                        className="flex items-center justify-center gap-3 my-2 mt-3 w-1/3 mx-auto bg-green-600 text-white rounded-xl py-1 "
                    >
                        Update Cover <MdFileDownloadDone />
                    </button>
                )}
            </div>{" "}
            <p className=" w-full h-1 mt-20"></p>
            <div className=" mt-20  rounded-xl border p-2 border-red-500">
                <p className="text-gray-500 ">
                    once you delete your course all its files and resources will
                    be deleted permenantly
                </p>

                <Link
                    className="bg-red-500 mt-10 rounded-xl p-2 px-10 text-white flex items-center gap-2"
                    href={route("teacher.delete_course", course.id)}
                    method="DELETE"
                >
                    <MdDeleteForever size={"1.2rem"} />
                    Delete Course
                </Link>
            </div>
        </TeacherLayout>
    );
}
