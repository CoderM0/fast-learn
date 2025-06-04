import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { MdAudioFile, MdOutlineSlowMotionVideo } from "react-icons/md";
import NavLink from "./NavLink";

export default function LessonsAccordion({
    lesson,
    course,
    index,

    course_index,
}) {
    const [open, setOpen] = useState(true);

    return (
        <div className=" mx-auto   pl-2  my-1">
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer select-none  my-2  flex justify-between mr-4"
            >
                <p className="text-indigo-900 border-b w-full pb-1">
                    {course_index + 1 + "."}
                    {index + 1}. {" " + lesson.title}
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
                className={`  transition-all duration-200  ${
                    open ? "max-h-[1000px]" : "max-h-0 "
                } overflow-hidden `}
            >
                <div className=" rounded-xl ">
                    {lesson.contents.map((el) => {
                        return (
                            <NavLink
                                active={route().current(
                                    "courses.enrolled.show",
                                    [course.id, el.id]
                                )}
                                preserveScroll
                                href={route("courses.enrolled.show", [
                                    course.id,
                                    el.id,
                                ])}
                                className="w-11/12 flex-grow   py-1  my-2 flex gap-2 "
                            >
                                <p className="">
                                    {el.type == "mp3" ||
                                    el.type == "wav" ||
                                    el.type == "m4a" ||
                                    el.type == "ogg" ||
                                    el.type == "mpeg" ? (
                                        <MdAudioFile
                                            size={"1.2rem"}
                                            color={"blue"}
                                            className="bg-white rounded-sm"
                                        />
                                    ) : el.type == "mp4" ? (
                                        <MdOutlineSlowMotionVideo
                                            size={"1.2rem"}
                                            color={"red"}
                                            className="bg-white rounded-xl"
                                        />
                                    ) : (
                                        <FaFilePdf
                                            size={"1.2rem"}
                                            className="text-orange-800 bg-white rounded-sm"
                                        />
                                    )}
                                </p>
                                <p>{el.title}</p>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
