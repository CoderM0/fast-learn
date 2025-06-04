import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ usercourses, rated_courses }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* <div>
                        {usercourses.map((course) => {
                            return (
                                <div className="flex flex-col gap-8">
                                    <div className="flex justify-between bg-lightbl text-white my-2 rounded-md items-center px-2">
                                        <Link
                                            className="p-2 my-2 "
                                            key={course.id}
                                            href={route(
                                                "courses.enrolled.index",
                                                course.id
                                            )}
                                        >
                                            <span className="flex gap-2 items-center">
                                                {course.name}{" "}
                                                <LuCircleArrowOutUpRight />
                                            </span>
                                        </Link>
                                        {rated_courses.includes(course.id) ? (
                                            <p className="text-white flex gap-1 items-center ">
                                                Rated <MdFileDownloadDone />
                                            </p>
                                        ) : (
                                            <ModalBox
                                                coursename={course.name}
                                                courseid={course.id}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
