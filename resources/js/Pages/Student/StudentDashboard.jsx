import CourseCard from "@/Components/CourseCard";
import CustomHead from "@/Components/CustomHead";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";

export default function StudentDashboard({ courses, rated_courses }) {
    return (
        <UserLayout>
            <CustomHead title={"My Courses"} />

            <div className="text-center font-bold text-3xl my-10">
                {courses.length == 0 ? (
                    <p>
                        {" "}
                        You dont have enrolled courses yet . browes courses{" "}
                        <Link
                            className="underline text-blue-500"
                            href={route("student.all_courses")}
                        >
                            Here
                        </Link>{" "}
                    </p>
                ) : (
                    " your courses"
                )}
            </div>
            <div className="flex  flex-wrap mt-5 px-8">
                {courses.map((course) => {
                    return (
                        <CourseCard
                            course={course}
                            key={course.id}
                            isTeacher={false}
                            isJoined={true}
                            isNotRated={!rated_courses.includes(course.id)}
                        />
                    );
                })}
            </div>
        </UserLayout>
    );
}
