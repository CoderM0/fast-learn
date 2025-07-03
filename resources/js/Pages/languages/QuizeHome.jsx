import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import QuestionField from "@/Components/QuestionField";
import { useForm } from "@inertiajs/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function QuizeHome({ quize, course_id, submit }) {
    // const [answers, setAnswers] = useState({});
    const { data, setData, post, reset, processing } = useForm();
    console.log("keys", Object.keys(data).length == quize.questions.length * 2);

    const submitanswers = (e) => {
        if (Object.keys(data).length == quize.questions.length * 2) {
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
                    quize.questions.map((quest) => {
                        return (
                            <div
                                key={quest.id}
                                className="bg-white p-2 rounded-xl my-2 border px-2"
                            >
                                <InputLabel className="text-blue-600 px-4 font-bold ">
                                    {quest.question_text}
                                </InputLabel>
                                <div className="flex justify-between my-5">
                                    {quest.options.map((op) => {
                                        return (
                                            <QuestionField
                                                key={op.id}
                                                op={op}
                                                data={data}
                                                questId={quest.id}
                                                setData={setData}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                )}

                {submit && !processing && (
                    <div className="flex gap-3 items-center">
                        <PrimaryButton
                            className="mt-6 w-full justify-center"
                            onClick={submitanswers}
                        >
                            Submit
                        </PrimaryButton>
                        <DangerButton
                            className="mt-6 w-full justify-center"
                            onClick={resetfields}
                        >
                            Reset
                        </DangerButton>
                    </div>
                )}
            </div>
        </div>
    );
}
