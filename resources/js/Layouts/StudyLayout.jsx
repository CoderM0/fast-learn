import CourseAccordion from "@/Components/CourseAccordion";
import CustomHead from "@/Components/CustomHead";
import UserLayout from "./UserLayout";

export default function StudyLayout({ course, children }) {
    return (
        <UserLayout>
            <CustomHead title={course.name} />
            <div className="flex justify-between m-2 rounded-xl">
                <div className="w-1/3 p-2 bg-[#FCF6F5] h-screen overflow-y-auto rounded-xl">
                    {course.modules.map((module, index) => {
                        return (
                            <CourseAccordion
                                module={module}
                                course={course}
                                course_index={index}
                            />
                        );
                    })}
                </div>
                <div className="w-2/3 p-0 px-1">{children}</div>
            </div>
        </UserLayout>
    );
}
