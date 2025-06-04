import CustomHead from "@/Components/CustomHead";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Link } from "@inertiajs/react";

export default function ViewStudents({ teacher, courses }) {
    console.log(courses);
    return (
        <TeacherLayout teacher={teacher}>
            <CustomHead title={"My Students"} />
            <div>
                <p>
                    {courses.map((course) => {
                        return (
                            <div key={course.id} className="my-5">
                                <h1 className="text-xl font-bold ">
                                    {course.name}
                                </h1>
                                {/*  */}
                                {course.students.length == 0 ? (
                                    <p className="text-center my-2 text-xl font-bold text-red-800">
                                        No Students Enrolled In This Course Yet
                                    </p>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto ">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Phone number
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Status
                                                </th>
                                                {/* <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Role
                                            </th> */}
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {course.students.map((stud) => {
                                                return (
                                                    <tr key={stud.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img
                                                                        className="h-10 w-10 rounded-full"
                                                                        src={`/storage/${stud.user.avatar}`}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900"></div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {
                                                                            stud.full_name
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {stud.phone_number}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Active
                                                            </span>
                                                        </td>
                                                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        Admin
                                                    </td> */}
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {stud.user.email}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                                            <Link
                                                                href={route(
                                                                    "teacher.remove_students",
                                                                    [
                                                                        course.id,
                                                                        stud.id,
                                                                    ]
                                                                )}
                                                                method="POST"
                                                                className="ml-2 text-red-600 hover:text-red-900"
                                                            >
                                                                Remove
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}
                                {/*  */}
                            </div>
                        );
                    })}
                </p>
            </div>
        </TeacherLayout>
    );
}
