import CourseSlider from "@/Components/CourseSlider";
import CustomHead from "@/Components/CustomHead";
import AdminLayout from "@/Layouts/AdminLayout";

export default function AdminAllCourses({ teachers }) {
    return (
        <AdminLayout>
            <CustomHead title={"Manage Content"} />
            <div className="my-2 h-[85vh] overflow-y-auto">
                {teachers.map((teacher) => {
                    return (
                        <div
                            key={teacher.id}
                            className="my-2 border-b-2 border-b-indigo-900 pb-2"
                        >
                            <div className="w-1/3 mx-auto">
                                <img
                                    src={`/storage/${teacher.user.avatar}`}
                                    alt="d"
                                    className="object-cover w-32 h-32 rounded-lg mx-auto"
                                />
                                <h1 className="text-center font-bold my-2 ">
                                    {teacher.full_name}
                                </h1>
                            </div>
                            <p className="border-b-2 w-full my-2 font-bold py-1 px-3">
                                {teacher.full_name} Courses
                            </p>

                            <CourseSlider courses={teacher.courses} />
                        </div>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
