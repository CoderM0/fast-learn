import CourseCard from "@/Components/CourseCard";
import CustomHead from "@/Components/CustomHead";
import UserLayout from "@/Layouts/UserLayout";

export default function StudentDashboard({ courses, rated_courses }) {
    return (
        <UserLayout>
            <CustomHead title={"My Courses"} />

            <div className="text-center font-bold text-3xl my-2">
                your courses
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
