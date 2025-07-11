import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";

export default function NavBar({ auth }) {
    return (
        <div className="text-black w-full flex justify-between items-center px-2 bg-[url('/images/2.jpg')] bg-cover bg-no-repeat py-4">
            <div className="w-2/12 max-sm:w-1/2 px-2">
                <ApplicationLogo className="w-28  h-28" />
            </div>
            <nav className="flex ">
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition  focus:outline-none focus-visible:ring-[#FF2D20] "
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition  focus:outline-none focus-visible:ring-[#FF2D20] "
                        >
                            Log in
                        </Link>
                        <Link
                            href={route("register")}
                            className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition  focus:outline-none focus-visible:ring-[#FF2D20] "
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
}
