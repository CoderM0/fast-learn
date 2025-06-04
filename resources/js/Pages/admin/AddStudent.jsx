import CustomHead from "@/Components/CustomHead";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
export default function AddStudent() {
    const { data, setData, errors, post, processing } = useForm({
        full_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        avatar: "",
    });
    const add_student = (e) => {
        e.preventDefault();
        post(route("admin.save_student"), {
            onSuccess: () => reset(),
        });
    };
    return (
        <AdminLayout>
            <CustomHead title={"Add Student"} />

            <form
                onSubmit={add_student}
                className="bg-white p-2 h-[85vh] overflow-y-auto"
            >
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
                <div className="flex items-center ">
                    <div className="w-1/2 pr-2">
                        <InputLabel className="mt-2">Password</InputLabel>
                        <TextInput
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
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
                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                            type="password"
                            placeholder="Password"
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                </div>

                {/*  */}

                {/*  */}
                <InputLabel className="mt-3 mb-1">Add phone number</InputLabel>
                <TextInput
                    value={data.phone_number}
                    onChange={(e) => setData("phone_number", e.target.value)}
                    className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                    type="number"
                    placeholder="+963.."
                />
                <InputError message={errors.phone_number} className="mt-2" />
                <InputLabel className="mt-3 mb-1">Add Student photo</InputLabel>
                <input
                    type="file"
                    className="my-2"
                    onChange={(e) => setData("avatar", e.target.files[0])}
                />
                <InputError message={errors.avatar} className="mt-2" />
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-1/2 mx-auto py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                    <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Add</span>
                </button>
            </form>
        </AdminLayout>
    );
}
