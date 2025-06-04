import { Link } from "@inertiajs/react";
import { LuCircleArrowOutUpRight } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import ModalBox from "./ModalBox";

export default function CourseCard({
    course,
    isTeacher,
    isJoined,
    isNotRated,
}) {
    return (
        <div className="w-[40%]">
            <div className="p-5">
                <div className="max-w-md bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                    <div className="relative">
                        <img
                            src={`/storage/${course.cover_img}`}
                            alt="Placeholder Course Image"
                            className="w-full h-40 object-cover"
                        />
                        {isJoined && isNotRated && (
                            <div className="absolute top-3 right-3 cursor-pointer">
                                <ModalBox
                                    coursename={course.name}
                                    courseid={course.id}
                                />
                            </div>
                        )}
                        <div className="absolute top-3 badge-flag-container">
                            <div className="relative bg-white pl-3 pr-4 py-1 text-xs font-semibold text-gray-700 flex items-center gap-1 badge-flag shadow-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                    />
                                </svg>
                                <span>CERTIFICATE</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-cyan-50 text-cyan-700 px-4 py-1 text-xs font-semibold flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                            />
                        </svg>
                        <span>{course.level}</span>
                    </div>

                    <div className="p-4">
                        <p className="text-xs text-gray-500 mb-1 flex gap-1 items-center">
                            {" "}
                            Rate : {course.rate}{" "}
                            <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        </p>
                        <h3 className="text-base font-semibold text-gray-800 mb-3 leading-tight">
                            {course.name}
                        </h3>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <span> {course.num_of_modules} Modules</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                    />
                                </svg>
                                <span>
                                    {course.num_of_subscribers} Learners
                                </span>
                            </div>
                        </div>
                        {/*  */}
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <span> {course.num_of_lessons} Lessons</span>
                            </div>
                            {isJoined && course.pivot && (
                                <div className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                    <span>
                                        Joined{" "}
                                        {new Date(
                                            course.pivot.created_at
                                        ).toDateString()}{" "}
                                    </span>
                                </div>
                            )}
                        </div>

                        {isJoined ? (
                            <div className="w-full px-2 flex justify-between gap-2">
                                <Link
                                    href={route(
                                        "courses.enrolled.index",
                                        course.id
                                    )}
                                    className="w-full bg-green-500 dark:bg-gray-700  dark:text-white py-2 px-4 rounded-full font-bold hover:bg-green-300 text-white  dark:hover:bg-gray-600 flex items-center gap-2 justify-center"
                                >
                                    Contniue learning{" "}
                                    <LuCircleArrowOutUpRight />
                                </Link>
                                <Link
                                    href={route(
                                        "courses.enrolled.unenroll",
                                        course.id
                                    )}
                                    method="POST"
                                    className="w-full bg-red-500 dark:bg-gray-700  dark:text-white py-2 px-4 rounded-full font-bold hover:bg-red-300 text-white  dark:hover:bg-gray-600 flex items-center gap-2 justify-center"
                                >
                                    UnEnroll
                                    <MdLogout />
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                {isTeacher ? (
                                    <div className="flex items-center gap-2 w-full">
                                        {" "}
                                        <Link
                                            href={route(
                                                `teacher.edit_course`,
                                                course.id
                                            )}
                                            className="text-center flex-1 w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={route(
                                                `courses.enrolled.index`,
                                                course.id
                                            )}
                                            className="text-center flex-1 w-full px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                        >
                                            View
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        {" "}
                                        <Link
                                            href={route(
                                                `student.show_course`,
                                                course.id
                                            )}
                                            className="text-center flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            More Info
                                        </Link>
                                        <Link
                                            href={route(
                                                "student.course.enroll",
                                                course.id
                                            )}
                                            method="POST"
                                            className="text-center flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                        >
                                            Start Learning
                                        </Link>{" "}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
