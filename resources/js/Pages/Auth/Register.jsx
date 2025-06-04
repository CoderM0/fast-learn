import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import TeacherRegisteration from "./TeacherRegisteration";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const {
        data: student_data,
        setData: setStudentData,
        post: post_student,
        errors: stu_errors,
        processing: stu_processing,
    } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        avatar: "",
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    const [currentRegister, setCurrentRegister] = useState("student");
    const checkRole = (role) => {
        if (role == 1) {
            setCurrentRegister("teacher");
        } else {
            setCurrentRegister("student");
            setStudentData("role", 2);
        }
    };
    useEffect(() => {
        setStudentData("role", 2);
    }, []);
    const add_student = (e) => {
        e.preventDefault();
        post_student(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-[70%] xl:w-7/12 p-6 sm:p-12">
                    <div className="mt-2 flex flex-col items-center">
                        <span className="text-end w-full">
                            Already member?{" "}
                            <Link
                                href={route("login")}
                                className="text-blue-500 underline"
                            >
                                Login Now{" "}
                            </Link>{" "}
                        </span>
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Sign up
                        </h1>
                        <div className="w-full flex-1 mt-4">
                            <div className="mx-auto ">
                                <div className="flex flex-col mt-3 mb-1 gap-2">
                                    <label
                                        htmlFor="seltype"
                                        className="font-bold "
                                    >
                                        Register As
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            checkRole(e.target.value);
                                        }}
                                        name="seltype"
                                        id="seltype"
                                        className="w-full rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    >
                                        <option value="2">Student</option>
                                        <option value="1">Teacher</option>
                                    </select>
                                </div>
                                <p className="border-t-2 w-full my-5"></p>
                                {currentRegister == "student" ? (
                                    <form onSubmit={add_student}>
                                        <div className="flex items-center ">
                                            <div className="w-1/2 pr-2">
                                                <InputLabel className="mt-3 mb-1">
                                                    Full Name
                                                </InputLabel>
                                                <TextInput
                                                    onChange={(e) =>
                                                        setStudentData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                    type="text"
                                                    placeholder="Your Full Name"
                                                />
                                                <InputError
                                                    message={stu_errors.name}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="w-1/2 pl-2">
                                                <InputLabel className="mt-3 mb-1">
                                                    Email
                                                </InputLabel>
                                                <TextInput
                                                    onChange={(e) =>
                                                        setStudentData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                    type="email"
                                                    placeholder="Email"
                                                />
                                                <InputError
                                                    message={stu_errors.email}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="w-1/2 pr-2">
                                                <InputLabel className="mt-2">
                                                    Password
                                                </InputLabel>
                                                <TextInput
                                                    onChange={(e) =>
                                                        setStudentData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                                <InputError
                                                    message={
                                                        stu_errors.password
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="w-1/2 pl-2">
                                                <InputLabel className="mt-2">
                                                    Confirm Password
                                                </InputLabel>
                                                <TextInput
                                                    onChange={(e) =>
                                                        setStudentData(
                                                            "password_confirmation",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                                <InputError
                                                    message={
                                                        stu_errors.password_confirmation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        {/*  */}

                                        {/*  */}
                                        <InputLabel className="mt-3 mb-1">
                                            Add Your phone number
                                        </InputLabel>
                                        <TextInput
                                            onChange={(e) =>
                                                setStudentData(
                                                    "phone_number",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                            type="number"
                                            placeholder="+963.."
                                        />
                                        <InputError
                                            message={stu_errors.phone_number}
                                            className="mt-2"
                                        />
                                        <InputLabel className="mt-3 mb-1">
                                            Add Your photo
                                        </InputLabel>
                                        <input
                                            type="file"
                                            className="my-2"
                                            onChange={(e) =>
                                                setStudentData(
                                                    "avatar",
                                                    e.target.files[0]
                                                )
                                            }
                                        />
                                        <InputError
                                            message={stu_errors.avatar}
                                            className="mt-2"
                                        />
                                        <button
                                            type="submit"
                                            disabled={stu_processing}
                                            className="mt-2 disabled:bg-indigo-300 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                                            <span className="ml-3">
                                                Sign Up
                                            </span>
                                        </button>
                                        <p className="mt-6 text-xs text-gray-600 text-center">
                                            I agree to Fast Learn
                                            <a
                                                href="#"
                                                className="border-b border-gray-500 border-dotted"
                                            >
                                                Terms of Service
                                            </a>
                                            and its
                                            <a
                                                href="#"
                                                className="border-b border-gray-500 border-dotted"
                                            >
                                                Privacy Policy
                                            </a>
                                        </p>
                                    </form>
                                ) : (
                                    <TeacherRegisteration />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-white text-center hidden lg:flex ">
                    <div className="m-2 w-full  bg-center bg-no-repeat bg-[url('../../public/images/learningpro.png')] bg-contain">
                        <div>
                            {/* <img
                                src="/images/flearn1.png"
                                className="w-32 mx-auto"
                            /> */}
                            <ApplicationLogo is_col={true} is_double={true} />
                        </div>
                        {/* <img
                            src="/images/learningpro.png"
                            alt=""
                            className="w-full h-full"
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
