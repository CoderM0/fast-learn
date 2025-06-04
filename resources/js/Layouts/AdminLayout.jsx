import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import SideLink from "@/Components/SideLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { LuTableOfContents } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import { SlPeople } from "react-icons/sl";

export default function AdminLayout({ children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="h-screen bg-gray-100 overflow-hidden  ">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between">
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center p-2 m-2">
                                <Link href="/">
                                    <ApplicationLogo className="block h-20 w-20 fill-current text-gray-800 m-2" />
                                </Link>
                            </div>

                            <Link
                                href={route("admin.dashboard")}
                                className="text-gray-900 font-bold"
                            >
                                Dashboard
                            </Link>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/*  */}
            <div className="flex justify-between">
                <aside className="w-[24%] bg-white shadow-md py-5 h-[85vh] ">
                    <nav className=" px-2">
                        <div className="group flex items-center gap-3 justify-center  py-2 text-center font-medium rounded-md border-b text-indigo-700">
                            Teachers <SlPeople />
                        </div>
                        <SideLink
                            href={route("admin.add_teacher")}
                            active={route().current("admin.add_teacher")}
                            className="mt-1 group flex items-center gap-3 px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                            <IoMdPersonAdd />
                            Add Teacher
                        </SideLink>
                        <SideLink
                            href={route("admin.manage_teachers")}
                            active={route().current("admin.manage_teachers")}
                            className="mt-1 group gap-3 flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                            <MdManageAccounts />
                            Manage Teachers
                        </SideLink>
                        {/*  */}
                        <div className="group mt-5 flex justify-center items-center gap-3 py-2 text-center font-medium rounded-md border-b text-indigo-700">
                            Students <SlPeople />
                        </div>
                        <SideLink
                            href={route("admin.add_student")}
                            active={route().current("admin.add_student")}
                        >
                            <IoMdPersonAdd />
                            Add Student
                        </SideLink>
                        <SideLink
                            href={route("admin.manage_students")}
                            active={route().current("admin.manage_students")}
                            className="mt-1 group flex items-center gap-3 px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                            <MdManageAccounts />
                            Manage Students
                        </SideLink>
                        <div className="group mt-5 flex justify-center items-center gap-3 py-2 text-center font-medium rounded-md border-b text-indigo-700">
                            Content <LuTableOfContents />
                        </div>
                        <SideLink
                            href={route("admin_content.courses.index")}
                            active={route().current(
                                "admin_content.courses.index"
                            )}
                            className="mt-1 group flex items-center gap-3 px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        >
                            <MdManageAccounts />
                            Manage Content
                        </SideLink>
                    </nav>
                </aside>
                <main className="w-[76%]">{children}</main>
            </div>
        </div>
    );
}
