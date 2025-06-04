import CustomHead from "@/Components/CustomHead";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { HiPencilSquare } from "react-icons/hi2";
import { ImBlocked } from "react-icons/im";
import DeleteTeacher from "./DeleteTeacher";

export default function TeachersTable({ teachers }) {
    return (
        <AdminLayout>
            <CustomHead title={"All Teachers"} />

            <div className=" w-full h-[85vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Bio
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Courses
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Expertise
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                License
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Join Date
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {teachers.map((teacher) => {
                            return (
                                <tr
                                    key={teacher.id}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={`/storage/${teacher.user.avatar}`}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {teacher.full_name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {teacher.user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 ">
                                            {teacher.biography.slice(0, 15)}...
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 ">
                                            {teacher.courses.length}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {teacher.expertise}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {teacher.license}
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(
                                                teacher.created_at
                                            ).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-1 flex  items-center  py-4  text-right text-sm font-medium">
                                        <Link
                                            href={route(
                                                "admin.edit_teacher",
                                                teacher.id
                                            )}
                                            className="border border-yellow-500 bg-yellow-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                                        >
                                            <HiPencilSquare size={"1.1rem"} />
                                        </Link>
                                        <Link
                                            href={route(
                                                "admin.block_teacher",
                                                teacher.id
                                            )}
                                            method="POST"
                                            className={` flex items-center gap-1 border ${
                                                teacher.is_active
                                                    ? " border-red-800 bg-red-800 hover:bg-red-900"
                                                    : "border-green-800 bg-green-800 hover:bg-green-900"
                                            }  text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none  focus:outline-none focus:shadow-outline`}
                                        >
                                            {teacher.is_active
                                                ? "Block"
                                                : "activate"}{" "}
                                            <ImBlocked size={"1.1rem"} />
                                        </Link>
                                        <DeleteTeacher teacher={teacher} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
