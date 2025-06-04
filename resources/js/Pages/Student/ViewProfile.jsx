import CustomHead from "@/Components/CustomHead";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import { FaPhoneAlt } from "react-icons/fa";

export default function ViewProfile({ student_pro, auth }) {
    return (
        <UserLayout>
            <CustomHead title={student_pro.full_name + " profile"} />
            <div className="w-full mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
                    <div className="relative h-48">
                        <div className="w-full h-full flex justify-center items-center bg-gray-100">
                            <h1 className="text-4xl text-gray-900 ">
                                - Fast Learn -
                            </h1>
                        </div>
                        <div className="absolute -bottom-12 left-6">
                            <img
                                src={`/storage/${student_pro.user.avatar}`}
                                alt="Profile"
                                className="w-40 h-40 rounded-xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                            />
                        </div>
                    </div>

                    <div className="pt-16 px-6 pb-6">
                        <div className="flex justify-between">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {student_pro.full_name}
                                        </h1>
                                        <p className="text-purple-600 dark:text-purple-400">
                                            Joind{" "}
                                            {new Date(
                                                student_pro.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">
                                    Hi, I'm a passionate Learner
                                </p>{" "}
                                <div className="mt-6 ">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Contact
                                    </h2>
                                    <a
                                        href="mailto:abhirajk@example.com"
                                        className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        {student_pro.user.email}
                                    </a>
                                    {/*  */}

                                    <p className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline">
                                        <FaPhoneAlt />

                                        {student_pro.phone_number}
                                    </p>
                                </div>
                            </div>

                            {/* courses */}
                            <div className="w-2/3 flex justify-between">
                                <div className=" w-10/12">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Courses
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {student_pro.courses.length == 0 ? (
                                            <p className="text-red-500">
                                                No Courses Yet
                                            </p>
                                        ) : (
                                            student_pro.courses.map(
                                                (course) => {
                                                    return (
                                                        <span
                                                            key={course.id}
                                                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-lg text-sm font-medium"
                                                        >
                                                            {course.name}
                                                        </span>
                                                    );
                                                }
                                            )
                                        )}
                                    </div>
                                </div>
                                {student_pro.user_id == auth.user.id && (
                                    <div className="flex w-1/2 justify-between px-4">
                                        <Link
                                            href={route("profile.edit")}
                                            className="flex h-12 items-center px-2 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                                        >
                                            Edit Account
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                        </Link>
                                        <Link
                                            className="flex h-12 items-center px-2 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                                            href={route(
                                                "student.edit_personal"
                                            )}
                                        >
                                            Edit Personal Info
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
