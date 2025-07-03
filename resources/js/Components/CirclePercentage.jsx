import { useEffect, useState } from "react";

export default function CirclePercentage({ score, maxDegree }) {
    const radius = 70;

    const circumference = 2 * Math.PI * radius;

    const percentage = (score / maxDegree) * 100;

    const targetOffset = circumference - (percentage / 100) * circumference;

    const [animatedOffset, setAnimatedOffset] = useState(circumference);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedOffset(targetOffset);
        }, 100);

        return () => clearTimeout(timer);
    }, [targetOffset]);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="relative w-40 h-40 rounded-full flex items-center justify-center bg-gray-100 shadow-lg overflow-hidden">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        className="text-gray-300"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="80"
                        cy="80"
                    />

                    <circle
                        className={`${
                            percentage >= 50
                                ? " text-blue-500 "
                                : " text-red-500 "
                        }  transition-all duration-1000 ease-out`}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={animatedOffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="80"
                        cy="80"
                    />
                </svg>

                <div
                    className={`absolute text-2xl font-bold ${
                        percentage >= 50 ? "text-blue-800 " : "text-red-500 "
                    } `}
                >
                    {Math.round(percentage)}%
                </div>
            </div>
        </div>
    );
}
