import NavBar from "@/Components/NavBar";
import { Head } from "@inertiajs/react";

export default function Welcome({ auth }) {
    const langs = ["English", "Frensh", "Turkish", "Russian", "Dutch"];
    // const handleImageError = () => {
    //     document
    //         .getElementById("screenshot-container")
    //         ?.classNameList.add("!hidden");
    //     document.getElementById("docs-card")?.classNameList.add("!row-span-1");
    //     document
    //         .getElementById("docs-card-content")
    //         ?.classNameList.add("!flex-row");
    //     document.getElementById("background")?.classNameList.add("!hidden");
    // };

    return (
        <>
            <Head title="Welcome" />
            <NavBar auth={auth} />
            <div className="bg-white mt-5">
                <header className="bg-indigo-700 text-white text-center py-12">
                    <h1 className="text-4xl font-bold mt-16">Who Are We ?</h1>
                </header>

                <section className="text-center py-12 px-4">
                    <h2 className="text-2xl font-bold">Mission And Values</h2>
                    <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
                        Our mission is to provide exceptional educational
                        services with a focus on availability, reliability, and
                        support.
                    </p>
                    <div className="flex justify-center space-x-8 mt-8 animate-fadeIn">
                        <div className="transition transform hover:scale-110">
                            <h3 className="text-xl font-bold">85+</h3>
                            <p className="text-gray-700">Specialists</p>
                        </div>
                        <div className="transition transform hover:scale-110">
                            <h3 className="text-xl font-bold">25+</h3>
                            <p className="text-gray-700">Years of Experience</p>
                        </div>
                    </div>
                </section>

                <section className="bg-indigo-700 text-white py-12 px-4">
                    <h2 className="text-2xl font-bold text-center">
                        Our Vision
                    </h2>
                    <p className="mt-4 text-center max-w-2xl mx-auto">
                        education anytime, anywhere. We aim to revolutionize the
                        education industry by making quality education
                        accessible to everyone.
                    </p>
                </section>

                <section className="text-center py-12 px-4">
                    <h2 className="text-2xl font-bold">
                        Our educating Specialties
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                        {langs.map((el) => {
                            return (
                                <div className="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
                                    <h3 className="text-xl font-bold">{el}</h3>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="bg-gray-100 py-12 px-4 my-4">
                    <a href={route("courses.index")}>
                        <h1 className="text-center text-xl animate-pulse w-fit mx-auto">
                            Start Your Career now
                        </h1>
                    </a>
                </section>

                <section className="bg-indigo-700 text-white text-center py-12 px-4">
                    <h2 className="text-2xl font-bold">Students Reviews</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
                        <div className="p-4 shadow-lg rounded-lg bg-lorange hover:bg-white hover:text-lightbl transition-colors">
                            <p>
                                "Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Proin sit amet tristique mi."
                            </p>
                            <h3 className="mt-4 font-bold">- Student A</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-lorange  hover:bg-white hover:text-lightbl transition-colors">
                            <p>
                                "Nullam ac augue eget diam posuere vehicula.
                                Vivamus quis nulla ac justo euismod posuere."
                            </p>
                            <h3 className="mt-4 font-bold">- Student B</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-lorange  hover:bg-white hover:text-lightbl transition-colors">
                            <p>
                                "Fusce tincidunt, arcu nec vestibulum tincidunt,
                                eros massa ullamcorper urna."
                            </p>
                            <h3 className="mt-4 font-bold">- Student C</h3>
                        </div>
                    </div>
                </section>

                <footer className="bg-indigo-700 text-white text-center py-8">
                    <p>
                        &copy; Copyright Fast Learn. All rights reserved 2025 .
                    </p>
                </footer>
            </div>
        </>
    );
}
