import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import AdminCourseCard from "./AdminCourseCard";

export default function CourseSlider({ courses }) {
    const sliderRef = useRef(null);
    const scrollAmount = 500;

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= scrollAmount;
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += scrollAmount;
        }
    };

    return (
        <div className="l">
            <div
                className="flex  bg--700 w-[75vw] overflow-x-auto scroll-smooth"
                ref={sliderRef}
            >
                {courses.map((course) => {
                    return <AdminCourseCard course={course} key={course.id} />;
                })}
            </div>
            <div className="flex justify-center gap-5 w-full mt-2">
                <button
                    className="bg-indigo-300 hover:bg-indigo-400  font-bold py-2 px-4 rounded"
                    onClick={scrollLeft}
                >
                    <IoIosArrowBack color="white" />
                </button>
                <button
                    className="bg-indigo-300 hover:bg-indigo-400 font-bold py-2 px-4 rounded"
                    onClick={scrollRight}
                >
                    <IoIosArrowForward color="white" />
                </button>
            </div>
        </div>
    );
}
