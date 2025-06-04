import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { IoPeople } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";

export default function TeacherLayout({ children }) {
    const { user } = usePage().props.auth;
    const [opened, setOpened] = useState(false);

    return (
        <div>
            <nav className="bg-indigo-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link>
                                <ApplicationLogo className="w-16 h-16" />
                            </Link>
                            {/* <div className="hidden md:ml-6 md:flex md:space-x-8">
                                <NavLink
                                    // href={route("doctor.dashboard")}
                                    // active={route().current(
                                    //     "doctor.dashboard"
                                    // )}
                                    className={`text-gray-400 hover:text-white border-b-2  px-1 pt-1 inline-flex items-center text-sm font-medium `}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    // href={route("doctor.add_task")}
                                    // active={route().current(
                                    //     "doctor.add_task"
                                    // )}
                                    className="text-gray-400 hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 inline-flex items-center text-sm font-medium"
                                >
                                    Add Task
                                </NavLink>
                                <NavLink
                                    // href={route(
                                    //     "doctor.business.index",
                                    //     student.doctor.id
                                    // )}
                                    // active={route().current(
                                    //     "doctor.business.index"
                                    // )}
                                    className="text-gray-400 hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 inline-flex items-center text-sm font-medium"
                                >
                                    Work Calendar
                                </NavLink>
                            </div> */}
                        </div>
                        <div className="flex items-center">
                            {/* <!-- Search --> */}
                            {/* <div className="hidden md:flex md:ml-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                                        placeholder="Search..."
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div> */}

                            {/* <!-- Profile dropdown --> */}
                            <div className="ml-3 relative hidden md:block">
                                <div className="flex items-center gap-2">
                                    <p className="text-white">{user.name}</p>
                                    <button
                                        onClick={() => setOpened(!opened)}
                                        type="button"
                                        className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            className="h-8 w-8 rounded-full border border-white"
                                            src={`/storage/${user.avatar}`}
                                            alt=""
                                        />
                                    </button>
                                </div>

                                {/* <!-- Dropdown menu, show/hide based on menu state --> */}
                                <div
                                    className={` ${
                                        opened
                                            ? "absolute z-20 origin-top-right right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            : "hidden"
                                    }`}
                                    id="user-menu"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex="-1"
                                >
                                    <Link
                                        href={route("teacher.view_profile")}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex="-1"
                                    >
                                        Your Profile
                                    </Link>

                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        tabIndex="-1"
                                    >
                                        Sign out
                                    </Link>
                                </div>
                            </div>

                            {/* <!-- Mobile menu button --> */}
                            <div className="flex items-center md:hidden ml-4">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-expanded="false"
                                    id="mobile-menu-button"
                                >
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex">
                <aside className="w-64 bg-[#FCF6F5] text-white min-h-screen">
                    <nav className="pt-10 px-2">
                        <div className="space-y-4">
                            <NavLink
                                href={route("teacher.dashboard")}
                                active={route().current("teacher.dashboard")}
                                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200 "
                            >
                                <svg
                                    className="h-5 w-5 mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Dashboard
                            </NavLink>

                            {/* <!-- Analytics Dropdown --> */}
                            <div className="space-y-1">
                                <NavLink
                                    href={route("teacher.courses")}
                                    active={route().current("teacher.courses")}
                                    className="flex items-center"
                                >
                                    <svg
                                        className="h-5 w-5 mr-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                    your Courses
                                </NavLink>
                            </div>

                            <div className="space-y-1">
                                <NavLink
                                    href={route("teacher.add_course")}
                                    active={route().current(
                                        "teacher.add_course"
                                    )}
                                    className="flex items-center gap-2"
                                >
                                    <MdAddToPhotos size={"1.5rem"} />
                                    Add a new Course
                                </NavLink>
                            </div>

                            <NavLink
                                href={route("teacher.get_students")}
                                active={route().current("teacher.get_students")}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
                            >
                                <IoPeople size={"1.5rem"} />
                                Your Students
                            </NavLink>
                        </div>
                    </nav>
                    {/* <!-- User Profile --> */}
                    <div className="mt-auto p-4 border-t border-gray-800">
                        <Link
                            href={route("teacher.view_profile")}
                            className="flex items-center"
                        >
                            <img
                                className="h-8 w-8 rounded-full"
                                src={`/storage/${user.avatar}`}
                                alt=""
                            />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-indigo-900">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-900">
                                    View profile
                                </p>
                            </div>
                        </Link>
                    </div>
                </aside>

                <main className="p-2 w-[80%]">{children}</main>
            </main>
        </div>
    );
}
