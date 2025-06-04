import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { TbCameraPlus } from "react-icons/tb";

import CustomHead from "@/Components/CustomHead";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
export default function EditTeacher({ teacher }) {
    const { data, setData, errors, processing, post, reset } = useForm({
        full_name: teacher.full_name,
        biography: teacher.biography,
        expertise: teacher.expertise,
        license: teacher.license,
        email: teacher.user.email,
    });
    const [newimg, setNewImg] = useState();
    const add_teacher = (e) => {
        e.preventDefault();

        post(route("admin.update_teacher", teacher.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout>
            <CustomHead title={"Edit Teacher"} />

            <form onSubmit={add_teacher} className="m-2 p-2">
                <div className="relative w-32 h-32 mx-auto">
                    <img
                        src={
                            newimg
                                ? URL.createObjectURL(newimg)
                                : `/storage/${teacher.user.avatar}`
                        }
                        className="w-32 h-32 rounded-full"
                        alt=""
                    />
                    <label
                        htmlFor="newimg"
                        className="absolute bottom-0 right-0 z-10 cursor-pointer rounded-full p-2 bg-green-500"
                    >
                        <TbCameraPlus className="text-white" size={"1.5rem"} />
                    </label>
                    <input
                        type="file"
                        name="newimg"
                        className="hidden"
                        id="newimg"
                        onChange={(e) => {
                            setData("avatar", e.target.files[0]);
                            setNewImg(e.target.files[0]);
                        }}
                    />
                </div>
                <div className="flex items-center">
                    <div className="w-1/2 pr-2">
                        <InputLabel className="mt-3 mb-1">Full Name</InputLabel>
                        <TextInput
                            value={data.full_name}
                            onChange={(e) =>
                                setData("full_name", e.target.value)
                            }
                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="text"
                            placeholder="Teacher Full Name"
                        />
                        <InputError
                            message={errors.full_name}
                            className="mt-2"
                        />
                    </div>
                    <div className="w-1/2 pl-2">
                        <InputLabel className="mt-3 mb-1">Email</InputLabel>
                        <TextInput
                            onChange={(e) => setData("email", e.target.value)}
                            value={data.email}
                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email"
                            placeholder="Email"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>
                {/* <div className="flex items-center">
                    <div className="w-1/2 pr-2">
                        <InputLabel className="mt-2">Password</InputLabel>
                        <TextInput
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                            type="password"
                            placeholder="Password"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div className="w-1/2 pl-2">
                        <InputLabel className="mt-2">
                            Confirm Password
                        </InputLabel>
                        <TextInput
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                            type="password"
                            placeholder="Password"
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                </div> */}

                {/*  */}

                {/*  */}
                <div className="flex items-center ">
                    <div className="w-1/2 pr-2">
                        <InputLabel className="mt-3 mb-1">License</InputLabel>
                        <TextInput
                            value={data.license}
                            onChange={(e) => setData("license", e.target.value)}
                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                            type="text"
                            placeholder="MWS"
                        />
                        <InputError message={errors.license} className="mt-2" />
                    </div>
                    <div className="w-1/2 pl-2">
                        <InputLabel className="mt-3 mb-1">expertise</InputLabel>
                        <TextInput
                            value={data.expertise}
                            onChange={(e) =>
                                setData("expertise", e.target.value)
                            }
                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-50  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                            type="text"
                            placeholder="3 years of.."
                        />
                        <InputError
                            message={errors.expertise}
                            className="mt-2"
                        />
                    </div>
                </div>
                <textarea
                    name=""
                    value={data.biography}
                    className="my-2 mt-4 rounded-xl w-full bg-gray-50"
                    onChange={(e) => setData("biography", e.target.value)}
                    placeholder="Bio"
                ></textarea>

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-1/2 mx-auto py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                    <span className="ml-3">Update</span>
                </button>
            </form>
        </AdminLayout>
    );
}
