import { Link } from "@inertiajs/react";

export default function SideLink({ className, active, children, ...props }) {
    return (
        <Link
            {...props}
            className={
                "mt-1 group flex items-center gap-3 px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 " +
                (active ? "bg-gray-200 text-gray-900 " : "" + " " + className)
            }
        >
            {children}
        </Link>
    );
}
