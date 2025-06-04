import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        // <GuestLayout>
        //     <Head title="Log in" />

        //     {status && (
        //         <div className="mb-4 text-sm font-medium text-green-600">
        //             {status}
        //         </div>
        //     )}

        //     <form onSubmit={submit}>
        //         <div>
        //             <InputLabel htmlFor="email" value="Email" />

        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 name="email"
        //                 value={data.email}
        //                 className="mt-1 block w-full"
        //                 autoComplete="username"
        //                 isFocused={true}
        //                 onChange={(e) => setData("email", e.target.value)}
        //             />

        //             <InputError message={errors.email} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password" value="Password" />

        //             <TextInput
        //                 id="password"
        //                 type="password"
        //                 name="password"
        //                 value={data.password}
        //                 className="mt-1 block w-full"
        //                 autoComplete="current-password"
        //                 onChange={(e) => setData("password", e.target.value)}
        //             />

        //             <InputError message={errors.password} className="mt-2" />
        //         </div>

        //         <div className="mt-4 block">
        //             <label className="flex items-center">
        //                 <Checkbox
        //                     name="remember"
        //                     checked={data.remember}
        //                     onChange={(e) =>
        //                         setData("remember", e.target.checked)
        //                     }
        //                 />
        //                 <span className="ms-2 text-sm text-gray-600">
        //                     Remember me
        //                 </span>
        //             </label>
        //         </div>

        //         <div className="mt-4 flex items-center justify-end">
        //             {canResetPassword && (
        //                 <Link
        //                     href={route("password.request")}
        //                     className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        //                 >
        //                     Forgot your password?
        //                 </Link>
        //             )}

        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Log in
        //             </PrimaryButton>
        //         </div>
        //     </form>
        //     <hr className="h-2 mt-2" />
        //     <div className="flex justify-center">
        //         <Link
        //             href={route("register")}
        //             className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
        //         >
        //             New memeber ? Register Now
        //         </Link>
        //     </div>
        // </GuestLayout>
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-[70%] xl:w-7/12 p-6 sm:p-12">
                    <div className="mt-2 flex flex-col items-center">
                        <span className="text-end w-full">
                            No account?{" "}
                            <Link
                                href={route("register")}
                                className="text-blue-500 underline"
                            >
                                Register Now{" "}
                            </Link>{" "}
                        </span>
                        <h1 className="text-2xl xl:text-3xl font-extrabold ">
                            Log In
                        </h1>

                        <div className="w-full flex-1 mt-4">
                            <div className="mx-auto ">
                                <p className="border-t-2 w-full my-5"></p>

                                <form onSubmit={submit}>
                                    <InputLabel className="mt-3 mb-1">
                                        Email
                                    </InputLabel>
                                    <TextInput
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full px-8 py-2 my-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        autoComplete="username"
                                        placeholder="Email"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />

                                    <InputLabel className="mt-2">
                                        Password
                                    </InputLabel>
                                    <TextInput
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        value={data.password}
                                        className="w-full px-8 py-2 my-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />

                                    {/*  */}

                                    {/*  */}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="mt-2 tracking-wide disabled:bg-indigo-300 font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                                        <span className="ml-3">Login</span>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
