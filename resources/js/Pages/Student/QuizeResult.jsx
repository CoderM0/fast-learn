import CirclePercentage from "@/Components/CirclePercentage";
import DangerButton from "@/Components/DangerButton";
import { useForm, usePage } from "@inertiajs/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function QuizeResult({ data }) {
    const { coursePlaylistData } = usePage().props;
    const percentage = (data.score / data.quize.questions.length) * 100;
    const { delete: destroy, processing } = useForm();
    const resetquize = () => {
        destroy(route("quize.reset", [coursePlaylistData.id, data.quize.id]));
    };
    return (
        <div>
            {processing ? (
                <div className="w-full h-full flex flex-col  justify-center items-center mt-5">
                    <AiOutlineLoading3Quarters
                        className="text-green-500 animate-spin"
                        size={"5rem"}
                    />{" "}
                    {"Resetting.. "}
                </div>
            ) : (
                <div className="my-1">
                    <h1
                        className={`${
                            percentage < 50
                                ? " text-red-500 "
                                : "text-blue-500 "
                        }  text-center text-2xl font-bold`}
                    >
                        Your Result is {data.score} /
                        {data.quize.questions.length}
                    </h1>
                    <CirclePercentage
                        score={data.score}
                        maxDegree={data.quize.questions.length}
                    />

                    <div className="flex gap-3 items-center">
                        <DangerButton
                            className="mt-6 w-1/2 mx-auto justify-center"
                            onClick={resetquize}
                        >
                            Reset
                        </DangerButton>
                    </div>
                </div>
            )}
        </div>
    );
}
