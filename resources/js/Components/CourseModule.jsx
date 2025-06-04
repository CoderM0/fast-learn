import { Link } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function CourseModule({ module }) {
    return (
        <li>
            <div class="px-4 py-2 sm:px-6 w-full border rounded-xl my-2">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {module.title}
                    </h3>
                    <div className="flex items-center gap-3 ">
                        <Link
                            href={route("teacher.modules.edit", module.id)}
                            class="font-medium border border-yellow-500 bg-yellow-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-yellow-600 focus:outline-none focus:shadow-outline flex items-center gap-2"
                        >
                            Edit <FaEdit />
                        </Link>
                        <Link
                            href={route("teacher.delete_module", module.id)}
                            method="DELETE"
                            class="font-medium border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline flex items-center gap-2"
                        >
                            Delete <MdDeleteForever />
                        </Link>
                    </div>
                </div>

                <div class="mt-4 flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-500">
                        Lessons:{" "}
                        <span class="text-green-600">
                            {module.lessons_number}
                        </span>
                    </p>
                </div>
            </div>
        </li>
    );
}
