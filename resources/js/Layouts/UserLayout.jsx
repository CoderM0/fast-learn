import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
export default function UserLayout({ children }) {
    const { user } = usePage().props.auth;
    const [opened, setOpened] = useState(false);
    return (
        <div>
            <nav className="bg-indigo-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link
                                href={
                                    user.role == 1
                                        ? route("teacher.dashboard")
                                        : route("student.dashboard")
                                }
                            >
                                <ApplicationLogo className="w-16 h-16" />
                            </Link>
                            {user.role == 2 && (
                                <div className="hidden md:ml-6 md:flex md:space-x-8">
                                    <NavLink
                                        href={route("student.dashboard")}
                                        active={route().current(
                                            "student.dashboard"
                                        )}
                                        className={`text-white   px-1 pt-1 inline-flex items-center text-sm font-medium `}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route("student.all_courses")}
                                        active={route().current(
                                            "student.all_courses"
                                        )}
                                        className="text-white border-b-2 border-transparent  px-1 pt-1 inline-flex items-center text-sm font-medium"
                                    >
                                        All Courses
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center">
                            {/* <!-- Search --> */}

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
                                            className="h-8 w-8 rounded-full"
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
                                        href={
                                            user.role == 1
                                                ? route("teacher.view_profile")
                                                : route("student.show_profile")
                                        }
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

                {/* Mobile menu, show/hide based on menu state  */}
                {/* <div className="md:hidden hidden" id="mobile-menu">
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={`/storage/${user.avatar}`}
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">
                                        Tom Cook
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        tom@example.com
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                                <a
                                    href="#"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                >
                                    Your Profile
                                </a>
                                <a
                                    href="#"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                >
                                    Settings
                                </a>
                                <a
                                    href="#"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                >
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div> */}
            </nav>
            <main>{children}</main>
        </div>
    );
}
