import CirclePercentage from "@/Components/CirclePercentage";
import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import { useForm, usePage } from "@inertiajs/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

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
                            percentage == 50
                                ? "text-blue-500"
                                : percentage < 50
                                ? " text-red-500 "
                                : "text-green-500 "
                        }  text-center text-2xl font-bold`}
                    >
                        Your Result is {data.score} /
                        {data.quize.questions.length}
                    </h1>
                    <CirclePercentage
                        score={data.score}
                        maxDegree={data.quize.questions.length}
                    />
                    <div className="flex flex-col gap-2">
                        {data.quize.questions.map((quest, index) => {
                            return (
                                <div
                                    key={quest.id}
                                    className="bg-white p-2 rounded-xl my-2 border px-2"
                                >
                                    <InputLabel className="text-blue-600 text-xl px-4 font-bold ">
                                        {index + 1 + "."}
                                        {quest.question_text}
                                    </InputLabel>
                                    <div className="flex flex-col my-2 gap-2">
                                        {quest.options.map((op) => {
                                            return (
                                                <div
                                                    key={op.id}
                                                    className="w-full px-2"
                                                >
                                                    <InputLabel
                                                        htmlFor={`q${quest.id}-o${op.id}`}
                                                        className={`text-indigo-900 cursor-pointer w-full flex items-center gap-3 px-2 ${
                                                            op.is_correct
                                                                ? "border-2 border-green-500 "
                                                                : " "
                                                        } mx-2 py-2 rounded-lg  text-center bg-gray-50 ${
                                                            data.stuanswers[
                                                                quest.id
                                                            ]?.option_id ==
                                                            op.id
                                                                ? data
                                                                      .stuanswers[
                                                                      quest.id
                                                                  ]
                                                                      .is_correct_answer
                                                                    ? "border border-green-500 bg-green-100 "
                                                                    : " border border-red-500 bg-red-100"
                                                                : ""
                                                        }`}
                                                    >
                                                        {data.stuanswers[
                                                            quest.id
                                                        ]?.option_id ==
                                                        op.id ? (
                                                            data.stuanswers[
                                                                quest.id
                                                            ]
                                                                .is_correct_answer ? (
                                                                <FaCheckCircle
                                                                    color="green"
                                                                    size={
                                                                        "1.2rem"
                                                                    }
                                                                />
                                                            ) : (
                                                                <MdCancel
                                                                    color="red"
                                                                    size={
                                                                        "1.2rem"
                                                                    }
                                                                />
                                                            )
                                                        ) : (
                                                            ""
                                                        )}
                                                        <input
                                                            type="radio"
                                                            name={`q-${quest.id}`}
                                                            id={`q${quest.id}-o${op.id}`}
                                                            value={op.id}
                                                            className="hidden"
                                                        />
                                                        {op.option_text}
                                                    </InputLabel>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
