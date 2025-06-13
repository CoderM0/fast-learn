import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function QuizeResult({ data }) {
    console.log("wat", data);
    const { delete: destroy, processing } = useForm();
    const resetquize = () => {
        destroy(route("quize.reset", [1, data.quize.id]));
    };
    return (
        <div>
            {processing ? (
                <div className="w-full h-full flex justify-center items-center mt-5">
                    {"Resetting.. "}
                    <AiOutlineLoading3Quarters
                        className="text-green-500 animate-spin"
                        size={"5rem"}
                    />{" "}
                </div>
            ) : (
                <div className="my-1">
                    <h1 className="text-green-500 text-center">
                        Your Result is {data.score} out of{" "}
                        {data.quize.questions.length}
                    </h1>
                    {data.quize.questions.map((quest) => {
                        return (
                            <div
                                key={quest.id}
                                className="bg-gray-100 p-2 rounded-xl my-2 border px-2"
                            >
                                <InputLabel className="text-blue-600 px-4 font-bold ">
                                    {quest.question_text}
                                </InputLabel>
                                <div className="flex justify-between my-5">
                                    {quest.options.map((op) => {
                                        return (
                                            <div
                                                key={op.id}
                                                className="w-full px-2"
                                            >
                                                <InputLabel
                                                    className={`text-white w-full block mx-2 py-1 rounded-lg  text-center ${
                                                        op.is_correct
                                                            ? "bg-green-500"
                                                            : "bg-gray-400"
                                                    }`}
                                                >
                                                    {" "}
                                                    {op.option_text}
                                                </InputLabel>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
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
