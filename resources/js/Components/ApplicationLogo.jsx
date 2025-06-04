export default function ApplicationLogo({ is_col, is_double }) {
    return (
        <div
            className={`flex ${
                is_col ? " flex-col " : ""
            } items-center gap-2 py-1 px-1 bg- rounded-lg `}
        >
            <svg
                width={is_double ? "4.5rem" : "2.5rem"}
                height={is_double ? "4.5rem" : "2.5rem"}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-1"
            >
                <polygon
                    points="100,0 190,50 190,150 100,200 10,150 10,50"
                    stroke="white"
                    strokeWidth="10"
                    fill="red"
                />

                <polygon
                    points="100,0 10,50 10,150 100,100"
                    fill="#292569"
                    className="fill-indigo-900"
                />

                <polygon
                    points="100,0 190,50 190,150 100,100"
                    fill="#f97316"
                    className="fill-orange-500"
                />

                <polygon points="85,80 135,100 85,120" fill="white" />
            </svg>

            <div className="text-xl font-bold text-white bg-indigo-900 px-2 py-1 rounded-md">
                FAST LEARN
            </div>
        </div>
    );
}
