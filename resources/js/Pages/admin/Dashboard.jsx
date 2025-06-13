import CustomHead from "@/Components/CustomHead";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ nums }) {
    console.log(nums);
    return (
        <AdminLayout>
            <CustomHead title={"Admin Home"} />

            <div className="flex">
                <div className="max-w-sm mb-6 md:md-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg">
                    <img
                        src="/images/teachers.png"
                        className="w-full mb-4 rounded-lg shadow-none  transition-shadow duration-500 ease-in-out group-hover:shadow-lg"
                        alt="laravel9-1646792144.jpg"
                    />

                    <p className="font-display max-w-sm text-2xl font-bold leading-tight">
                        <span className="link-underline link-underline-black flex justify-center text-black text-center">
                            <span className="text-green-600 mr-2">
                                {nums["teachers_num"]}{" "}
                            </span>{" "}
                            Teachers
                        </span>
                    </p>
                </div>
                <div className="max-w-sm mb-6 md:md-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg">
                    <img
                        src="/images/students.png"
                        className="w-full mb-4 rounded-lg shadow-none  transition-shadow duration-500 ease-in-out group-hover:shadow-lg"
                        alt="laravel9-1646792144.jpg"
                    />

                    <p className="font-display max-w-sm text-2xl font-bold leading-tight">
                        <span className="link-underline link-underline-black flex justify-center text-black text-center">
                            <span className="text-green-600 mr-2">
                                {nums["students_num"]}{" "}
                            </span>{" "}
                            Students
                        </span>
                    </p>
                </div>
                <div className="max-w-sm mb-6 md:md-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg">
                    <img
                        src="/images/courses.png"
                        className="w-full mb-4 rounded-lg shadow-none  transition-shadow duration-500 ease-in-out group-hover:shadow-lg"
                        alt="laravel9-1646792144.jpg"
                    />

                    <p className="font-display max-w-sm text-2xl font-bold leading-tight">
                        <span className="link-underline link-underline-black flex justify-center text-black text-center">
                            <span className="text-green-600 mr-2">
                                {nums["courses_num"]}{" "}
                            </span>{" "}
                            Courses
                        </span>
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
