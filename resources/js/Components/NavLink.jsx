import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex items-center px-4 py-2.5   text-sm font-medium rounded-lg   group transition-all duration-200
${" " + className + " "}
                      ${
                          active
                              ? " text-white  bg-indigo-900 hover:bg-indigo-900 "
                              : " text-indigo-900 hover:bg-indigo-300 hover:text-white"
                      }

               `}
        >
            {children}
        </Link>
    );
}
