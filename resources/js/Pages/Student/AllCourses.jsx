import CourseCard from "@/Components/CourseCard";
import CustomHead from "@/Components/CustomHead";
import UserLayout from "@/Layouts/UserLayout";

export default function AllCourses({ student, courses }) {
    return (
        <UserLayout>
            <CustomHead title={"All Courses"} />
            <div>
                <h1 className="text-3xl font-mono px-10 py-4">All Courses</h1>
                <div className="flex  flex-wrap mt-5">
                    {courses.map((course) => {
                        return (
                            <CourseCard
                                course={course}
                                isJoined={course.students.some(
                                    (el) => el.id == student.id
                                )}
                                key={course.id}
                                isTeacher={false}
                            />
                        );
                    })}
                </div>{" "}
            </div>
        </UserLayout>
    );
}
