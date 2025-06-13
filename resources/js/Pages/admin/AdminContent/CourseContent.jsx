import CustomHead from "@/Components/CustomHead";
import AdminLayout from "@/Layouts/AdminLayout";
import ModuleControll from "./ModuleControll";
export default function CourseContent({ course }) {
    console.log(course);

    return (
        <AdminLayout>
            <CustomHead title={"Edit " + course.name + " Course"} />

            <div className="w-[100%]   max-sm:w-full mx-auto py-2 ">
                <div className="">
                    <div className="flex justify-between  my-2 bg-indigo-800 text-white p-2 rounded-t-lg">
                        <h1 className="text-center">{course.name} Modules</h1>
                    </div>
                </div>
                <ul className="bg-white shadow overflow-hidden sm:rounded-md">
                    {course.modules.map((mod) => {
                        return <ModuleControll mod={mod} key={mod.id} />;
                    })}{" "}
                </ul>

                {/* imag */}
            </div>
        </AdminLayout>
    );
}
