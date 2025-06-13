import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import LessonControll from "./LessonControll";
export default function ModuleControll({ mod }) {
    const [OpenModule, setOpenModule] = useState(false);

    const { processing: processingModule, delete: destroyModule } = useForm();
    const deleteModule = (module_id) => {
        destroyModule(route("admin_content.delete_module", module_id));
    };
    return (
        <div className="mb-2">
            <div className="flex justify-between items-center p-2 bg-gray-200 shadow-lg">
                <div className="flex gap-2">
                    <h1 className="font-bold flex items-center gap-2">
                        {mod.title}
                        <p className="text-green-500">
                            ({mod.lessons.length} Lessons)
                        </p>
                        <button onClick={() => setOpenModule(!OpenModule)}>
                            {OpenModule ? (
                                <IoIosArrowDown />
                            ) : (
                                <IoIosArrowForward />
                            )}
                        </button>
                    </h1>
                </div>
                <button
                    onClick={() => deleteModule(mod.id)}
                    disabled={processingModule}
                    className="flex disabled:bg-red-300 items-center gap-2 bg-red-500 text-white p-1 rounded-lg"
                >
                    Delete Module
                    {processingModule && (
                        <AiOutlineLoading3Quarters
                            className="text-green-500 animate-spin"
                            color="white"
                        />
                    )}
                </button>
            </div>
            <div
                className={`my-2 p-2 shadow-lg bg-gray-100 ${
                    OpenModule ? "block" : "hidden"
                }`}
            >
                {mod.lessons.map((lesson, index) => {
                    return (
                        <LessonControll
                            lesson={lesson}
                            index={index}
                            key={lesson.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}
