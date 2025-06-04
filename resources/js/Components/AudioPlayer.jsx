import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

export default function AudioPlayer({ audio, title }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${remainingSeconds}`;
    };

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener("timeupdate", handleTimeUpdate);
            audioElement.addEventListener(
                "loadedmetadata",
                handleLoadedMetadata
            );
            audioElement.addEventListener("play", () => setIsPlaying(true));
            audioElement.addEventListener("pause", () => setIsPlaying(false));

            return () => {
                audioElement.removeEventListener(
                    "timeupdate",
                    handleTimeUpdate
                );
                audioElement.removeEventListener(
                    "loadedmetadata",
                    handleLoadedMetadata
                );
                audioElement.removeEventListener("play", () =>
                    setIsPlaying(true)
                );
                audioElement.removeEventListener("pause", () =>
                    setIsPlaying(false)
                );
            };
        }
    }, [audio]);

    // const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div>
            {" "}
            <div class="mt-6 sm:mt-10 relative z-10 rounded-xl shadow-xl border">
                <div class="bg-white border-slate-100 dark:bg-slate-800 transition-all duration-500 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
                    <div class="flex items-center space-x-4">
                        <div class="min-w-0 flex-auto space-y-1 font-semibold">
                            <p class="text-cyan-500 transition-all duration-500 dark:text-cyan-400 text-sm leading-6">
                                <abbr title="Episode">Ep.</abbr> 128
                            </p>
                            <h2 class="text-slate-500 transition-all duration-500 dark:text-slate-400 text-sm leading-6 truncate">
                                lorem ipsum .....
                            </h2>
                            <p class="text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg">
                                {title}
                            </p>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <audio ref={audioRef} className="w-full h-20" controls>
                            <source src={"/storage/" + audio} />
                        </audio>
                        <div class="flex justify-between text-sm leading-6 font-medium tabular-nums">
                            <div class="text-cyan-500 transition-all duration-500 dark:text-slate-100">
                                {formatTime(currentTime)}
                            </div>
                            <div class="text-slate-500 transition-all duration-500 dark:text-slate-400"></div>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-50 text-slate-500  dark:bg-slate-600 transition-all duration-500 dark:text-slate-200 rounded-b-xl flex items-center">
                    <button
                        type="button"
                        class="bg-white text-slate-900  dark:bg-slate-100 transition-all duration-500 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                        aria-label="Pause"
                        onClick={() => handlePlayPause()}
                    >
                        {isPlaying ? (
                            <svg width="30" height="32" fill="currentColor">
                                <rect
                                    x="6"
                                    y="4"
                                    width="4"
                                    height="24"
                                    rx="2"
                                ></rect>
                                <rect
                                    x="20"
                                    y="4"
                                    width="4"
                                    height="24"
                                    rx="2"
                                ></rect>
                            </svg>
                        ) : (
                            <FaPlay size={"1.5rem"} />
                        )}
                    </button>
                </div>
            </div>{" "}
        </div>

        // <div className="p-4 bg-gray-100 rounded-md shadow-md">
        //     <audio ref={audioRef}>
        //         <source src={`/storage/${audio}`} />
        //     </audio>

        //     <div className="mt-2 flex items-center space-x-4">
        //         <button
        //             onClick={handlePlayPause}
        //             className="p-2 rounded-full focus:outline-none"
        //         >
        //             {isPlaying ? (
        //                 <svg
        //                     viewBox="0 0 24 24"
        //                     fill="currentColor"
        //                     className="w-6 h-6"
        //                 >
        //                     <path
        //                         fillRule="evenodd"
        //                         d="M6.75 5.25a3 3 0 013 3v1.5h7.5v-1.5a3 3 0 013-3h-15zM12 2.25c-1.306 0-2.417.835-2.829 2.044a5.25 5.25 0 00-1.023 2.456H6.75a3 3 0 00-3 3v9a3 3 0 003 3h10.5a3 3 0 003-3v-9a3 3 0 00-3-3h-2.198a5.25 5.25 0 00-1.023-2.456A2.997 2.997 0 0112 2.25zM8.25 10.5h1.5v3h-1.5v-3zm4.5 0h1.5v3h-1.5v-3zm4.5 0h1.5v3h-1.5v-3z"
        //                         clipRule="evenodd"
        //                     />
        //                 </svg>
        //             ) : (
        //                 <svg
        //                     viewBox="0 0 24 24"
        //                     fill="currentColor"
        //                     className="w-6 h-6"
        //                 >
        //                     <path
        //                         fillRule="evenodd"
        //                         d="M4.5 5.653c0-1.426 1.529-2.33 2.77-1.68l13.56 8.47c1.145.697 1.145 2.457 0 3.154l-13.56 8.47a2.25 2.25 0 01-2.77-1.68V5.653z"
        //                         clipRule="evenodd"
        //                     />
        //                 </svg>
        //             )}
        //         </button>

        //         <span className="text-sm text-gray-600 dark:text-gray-400">
        //             {formatTime(currentTime)}
        //         </span>

        //         <div className="flex-1 bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden">
        //             <input
        //                 type="range"
        //                 min="0"
        //                 max={duration}
        //                 value={currentTime}
        //                 onChange={handleSeek}
        //                 className="w-full h-2 bg-cyan-500 cursor-pointer appearance-none rounded-full"
        //                 style={{
        //                     backgroundSize: `${progress}% 100%`,
        //                     backgroundRepeat: "no-repeat",
        //                 }}
        //             />
        //         </div>

        //         <span className="text-sm text-gray-600 dark:text-gray-400">
        //             {formatTime(duration)}
        //         </span>
        //     </div>
        // </div>
    );
}
