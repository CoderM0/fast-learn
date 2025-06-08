import CustomHead from "@/Components/CustomHead";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
export default function EditStudent({ student }) {
    const [newimg, setNewImg] = useState();

    const { data, setData, errors, post, processing } = useForm({
        full_name: student.full_name,
        email: student.user.email,
        phone_number: student.phone_number,
        avatar: "",
    });
    const add_student = (e) => {
        e.preventDefault();
        post(route("admin.update_student", student.id), {
            onSuccess: () => reset(),
        });
    };
    return (
        <AdminLayout>
            <CustomHead title={"Edit Student"} />

            <form onSubmit={add_student} className="bg-white p-2">
                <div className="relative w-32 h-32 mx-auto">
                    <img
                        src={
                            newimg
                                ? URL.createObjectURL(newimg)
                                : `/storage/${student.user.avatar}`
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
                <div className="flex items-center ">
                    <div className="w-1/2 pr-2">
                        <InputLabel className="mt-3 mb-1">Full Name</InputLabel>
                        <TextInput
                            onChange={(e) =>
                                setData("full_name", e.target.value)
                            }
                            value={data.full_name}
                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="text"
                            placeholder="Full Name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="w-1/2 pl-2">
                        <InputLabel className="mt-3 mb-1">Email</InputLabel>
                        <TextInput
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email"
                            placeholder="Email"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                {/*  */}

                {/*  */}
                <InputLabel className="mt-3 mb-1"> phone number</InputLabel>
                <TextInput
                    value={data.phone_number}
                    onChange={(e) => setData("phone_number", e.target.value)}
                    className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                    type="number"
                    placeholder="+963.."
                />
                <InputError message={errors.phone_number} className="mt-2" />

                <button
                    type="submit"
                    disabled={processing}
                    className="my-6 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-1/2 mx-auto py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                    <span className="ml-3">Update </span>
                </button>
            </form>
        </AdminLayout>
    );
}
