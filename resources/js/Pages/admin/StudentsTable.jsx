import CustomHead from "@/Components/CustomHead";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { HiPencilSquare } from "react-icons/hi2";
import DeleteStudent from "./DeleteStudent";

export default function StudentsTable({ students }) {
    return (
        <AdminLayout className="shadow-lg rounded-lg overflow-x-hidden mx-4 md:mx-10 h-[85vh] overflow-y-auto">
            <CustomHead title={"All Students"} />

            <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                            Name
                        </th>
                        <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                            Email
                        </th>
                        <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                            Phone
                        </th>
                        <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                            courses
                        </th>
                        <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {students.map((student) => {
                        return (
                            <tr key={student.id}>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`/storage/${student.user.avatar}`}
                                            className="w-12 h-12 rounded-full"
                                            alt=""
                                        />
                                        {student.full_name}
                                    </div>
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200 truncate">
                                    {student.user.email}
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    {student.phone_number}
                                </td>
                                <td className="py-4 border-b border-gray-200">
                                    <div className="flex items-center">
                                        {student.courses.length == 0 && (
                                            <p>No courses Yet</p>
                                        )}
                                        {student.courses.map((course) => {
                                            return (
                                                <span
                                                    key={course.id}
                                                    className="bg-green-500 text-white py-1 px-2 rounded-full text-xs"
                                                >
                                                    {course.name}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </td>
                                <td className="py-4 border-b border-gray-200 flex items-center gap-3 ">
                                    <Link
                                        href={route(
                                            "admin.edit_student",
                                            student.id
                                        )}
                                        className="border border-yellow-500 bg-yellow-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                                    >
                                        <HiPencilSquare size={"1.3rem"} />
                                    </Link>
                                    <DeleteStudent
                                        student={student}
                                        className={" h-1/4 "}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </AdminLayout>
    );
}
