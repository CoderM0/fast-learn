import { useState } from "react";
import LessonsAccordion from "./LessonsAccordion";
import NavLink from "./NavLink";

export default function CourseAccordion({ module, course, course_index }) {
    const [open, setOpen] = useState(true);

    return (
        <div className=" mx-auto bg-[#FCF6F5]  rounded-xl my-2 border-gray-400 ">
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer select-none p-3 my-2  flex justify-between"
            >
                <p className="text-indigo-900 border-b w-full pb-1">
                    {course_index + 1} {". " + module.title}
                </p>

                <svg
                    class={`w-5 h-5 text-indigo-900 transition ${
                        open ? "rotate-90 " : "rotate-0"
                    } `}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                </svg>
            </div>
            <div
                className={`transition-all duration-300  ${
                    open ? "max-h-[1000px]" : "max-h-0 "
                } overflow-hidden `}
            >
                <div className="p-1 pl-5 rounded-lg ">
                    {module.lessons.map((el, index) => {
                        return (
                            <LessonsAccordion
                                lesson={el}
                                course_index={course_index}
                                course={course}
                                index={index}
                            />
                        );
                    })}
                    {module.quize && (
                        <NavLink
                            className="mt-5 text-center px-3 block w-11/12 py-1 border rounded-md mx-2 gap-2"
                            href={route("courses.enrolled.show.quize", [
                                course.id,
                                module.quize.id,
                            ])}
                            active={route().current(
                                "courses.enrolled.show.quize",
                                [course.id, module.quize.id]
                            )}
                        >
                            {module.quize.name}
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}
