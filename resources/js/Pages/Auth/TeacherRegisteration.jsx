import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
export default function TeacherRegisteration() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        license: "",
        expertise: "",
        avatar: "",
        bio: "",
    });
    const add_teacher = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    useEffect(() => {
        setData("role", 1);
    }, []);
    return (
        <form onSubmit={add_teacher}>
            <div className="flex items-center">
                <div className="w-1/2 pr-2">
                    <InputLabel className="mt-3 mb-1">Full Name</InputLabel>
                    <TextInput
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Your Full Name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="w-1/2 pl-2">
                    <InputLabel className="mt-3 mb-1">Email</InputLabel>
                    <TextInput
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-1/2 pr-2">
                    <InputLabel className="mt-2">Password</InputLabel>
                    <TextInput
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                        type="password"
                        placeholder="Password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="w-1/2 pl-2">
                    <InputLabel className="mt-2">Confirm Password</InputLabel>
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
            </div>

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
                        onChange={(e) => setData("expertise", e.target.value)}
                        className="w-full px-8 py-2 rounded-lg font-medium bg-gray-50  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                        type="text"
                        placeholder="3 years of.."
                    />
                    <InputError message={errors.expertise} className="mt-2" />
                </div>
            </div>
            <textarea
                name=""
                value={data.bio}
                className="my-2 mt-4 rounded-xl w-full bg-gray-50"
                onChange={(e) => setData("bio", e.target.value)}
                placeholder="Bio"
            ></textarea>
            <InputLabel className="mt-3 mb-1">Add Your photo</InputLabel>
            <input
                type="file"
                className="my-2"
                onChange={(e) => setData("avatar", e.target.files[0])}
            />
            <InputError message={errors.avatar} className="mt-2" />
            <button
                type="submit"
                disabled={processing}
                className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                <span className="ml-3">Sign Up</span>
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
                I agree to Fast Learn
                <a href="#" className="border-b border-gray-500 border-dotted">
                    Terms of Service
                </a>
                and its
                <a href="#" className="border-b border-gray-500 border-dotted">
                    Privacy Policy
                </a>
            </p>
        </form>
    );
}
