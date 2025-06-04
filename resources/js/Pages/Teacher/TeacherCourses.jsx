import CourseCard from "@/Components/CourseCard";
import CustomHead from "@/Components/CustomHead";
import TeacherLayout from "@/Layouts/TeacherLayout";

export default function TeacherCourses({ teacher, courses }) {
    return (
        <TeacherLayout teacher={teacher}>
            <CustomHead title={"My Courses"} />
            <div className="flex">
                {courses.length == 0 ? (
                    <p className="font-bold text-center my-5">
                        You Dont Have Courses Yet.{" "}
                    </p>
                ) : (
                    courses.map((course) => {
                        return (
                            <CourseCard
                                key={course.id}
                                course={course}
                                isTeacher={true}
                            />
                        );
                    })
                )}
            </div>
        </TeacherLayout>
    );
}
