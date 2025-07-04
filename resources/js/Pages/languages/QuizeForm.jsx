import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function QuizeForm({ quize, course_id, submit }) {
    // const [answers, setAnswers] = useState({});
    const { data, setData, post, reset, processing } = useForm();
    // console.log("keys", Object.keys(data).length == quize.questions.length);
    console.log("keys", Object.keys(data));
    // console.log(data);
    const submitanswers = (e) => {
        if (Object.keys(data).length == quize.questions.length) {
            post(route("courses.quize.solve", [course_id, quize.id]));
            reset();
        }
    };
    const resetfields = () => {
        reset();
    };
    return (
        <div>
            <div className="w-full px-2">
                {processing ? (
                    <div className="w-full h-full flex flex-col gap-2  justify-center items-center mt-5">
                        <AiOutlineLoading3Quarters
                            className="text-green-500 animate-spin"
                            size={"5rem"}
                        />{" "}
                        {"Submitting.. "}
                    </div>
                ) : (
                    quize.questions.map((quest, index) => {
                        return (
                            <div
                                key={quest.id}
                                className="bg-white p-2 rounded-xl my-2 border px-2"
                            >
                                <InputLabel className="text-blue-600 text-xl px-4 font-bold ">
                                    {index + 1 + "."} {quest.question_text}
                                </InputLabel>
                                <div className="flex flex-col my-2 gap-2">
                                    {quest.options.map((op) => {
                                        return (
                                            <div
                                                key={op.id}
                                                className="w-full px-2"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`q-${quest.id}`}
                                                    id={`q${quest.id}-o${op.id}`}
                                                    value={op.id}
                                                    className="hidden peer"
                                                    onChange={(e) => {
                                                        setData(
                                                            `q${quest.id}`,
                                                            `o${op.id}-is_cor-${op.is_correct}`
                                                        );
                                                    }}
                                                />
                                                <label
                                                    htmlFor={`q${quest.id}-o${op.id}`}
                                                    className={`text-indigo-900   peer-checked:bg-blue-500   peer-checked:text-white  bg-gray-100 cursor-pointer w-full flex items-center gap-2 px-2 mx-2 py-2 rounded-lg  text-center `}
                                                >
                                                    {" "}
                                                    {op.option_text}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                )}

                {submit && !processing && (
                    <div className="flex gap-3 items-center justify-center mb-5">
                        <PrimaryButton
                            className="mt-6 w-1/3 justify-center"
                            onClick={submitanswers}
                        >
                            Submit
                        </PrimaryButton>
                        {/* <DangerButton
                            className="mt-6 w-1/3 justify-center"
                            onClick={resetfields}
                        >
                            Reset
                        </DangerButton> */}
                    </div>
                )}
            </div>
        </div>
    );
}
