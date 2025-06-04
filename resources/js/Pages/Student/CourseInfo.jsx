import CustomHead from "@/Components/CustomHead";
import Stars from "@/Components/Stars";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import { LuCircleArrowOutUpRight } from "react-icons/lu";

export default function CourseInfo({ student, course }) {
    const isuser = course.students.find((el) => {
        return el.id == student.id;
    });
    return (
        <UserLayout>
            <CustomHead title={`${course.name} Info`} />
            <div className="bg-gray-100 dark:bg-gray-800 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img
                                    className="w-full h-full object-cover"
                                    src={`/storage/${course.cover_img}`}
                                    alt="Product Image"
                                />
                            </div>
                            <div className=" -mx-2 mb-4">
                                {!isuser ? (
                                    <div className="w-full px-2">
                                        <Link
                                            href={route(
                                                "student.course.enroll",
                                                course.id
                                            )}
                                            method="POST"
                                            className="w-full text-center bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700 flex justify-center"
                                        >
                                            Enroll
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="w-full px-2">
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
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                {course.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                {course.description}
                            </p>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">
                                        Modules :
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {" " + course.num_of_modules}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">
                                        Lessons:
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {"  " + course.num_of_lessons}
                                    </span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <p className="font-bold text-gray-700 dark:text-gray-300">
                                    Course Level :{" "}
                                    <span className="text-green-500 font-bold">
                                        {course.level}
                                    </span>
                                </p>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                    Rate
                                </span>
                                <div className="flex items-center mt-2">
                                    {course.rate == 0 ? (
                                        0
                                    ) : (
                                        <Stars rate={course.rate} />
                                    )}
                                </div>
                            </div>
                            <div>
                                <span className="font-bold text-center text-gray-700 dark:text-gray-300">
                                    Instructor
                                </span>
                                <section className="mt-10  w-full">
                                    <div className="w-full md:mx-auto flex flex-col md:flex-row items-center  text-center">
                                        <img
                                            className="inline-flex object-cover border-4 border-indigo-600 rounded-full  shadow-indigo-600/100 bg-indigo-50 !h-32 !w-32 mb-4 md:mb-0 ml-0 md:mr-5"
                                            src={`/storage/${course.teacher.user.avatar}`}
                                            alt=""
                                        />
                                        <div className="flex flex-col">
                                            <div className="md:text-justify mb-3">
                                                <div className="flex flex-col mb-5">
                                                    <Link
                                                        href={route(
                                                            "user.show_profile",
                                                            course.teacher.user
                                                                .id
                                                        )}
                                                        className="text-indigo-900 font-bold text-xl"
                                                    >
                                                        {
                                                            course.teacher
                                                                .full_name
                                                        }
                                                    </Link>
                                                </div>

                                                <p className="text-indigo-300 font-semibold text-center md:text-left">
                                                    {course.teacher.expertise} |
                                                    {course.teacher.license}
                                                </p>
                                                <p className="text-gray-500">
                                                    {course.teacher.biography}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
