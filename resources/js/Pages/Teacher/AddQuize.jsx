import CustomHead from "@/Components/CustomHead";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function AddQuize({ quize, teacher }) {
    const optone = useRef();
    const opttwo = useRef();
    const optthree = useRef();
    const optfour = useRef();
    const { data, post, reset, setData, errors } = useForm({
        question_text: "",
        opt_one: "",
        opt_two: "",
        opt_three: "",
        opt_four: "",
        is_one_correct: false,
        is_two_correct: false,
        is_three_correct: false,
        is_four_correct: false,
    });

    const addquest = (e) => {
        e.preventDefault();

        if (
            Object.keys(data).length == 9 &&
            Object.values(data).find((el) => el === true)
        ) {
            post(route("teacher.add_question.store", quize.id));
            reset();
            resetradio();
            optone.current.checked = false;
            opttwo.current.checked = false;
            optthree.current.checked = false;
            optfour.current.checked = false;
        }
    };
    const resetradio = () => {
        const vals = ["one", "two", "three", "four"];
        vals.forEach((oneval) => {
            setData(`is_${oneval}_correct`, false);
        });
    };

    const handleRadio = (val) => {
        resetradio();
        setData(`is_${val}_correct`, true);
    };
    return (
        <TeacherLayout teacher={teacher}>
            <CustomHead title={"Add Quize"} />
            <div className="flex mt-5 max-sm:flex-col">
                <form className=" w-1/2 max-sm:w-full px-2" onSubmit={addquest}>
                    <InputLabel>Add Question</InputLabel>
                    <TextInput
                        name="question_text"
                        value={data.question_text}
                        onChange={(e) =>
                            setData("question_text", e.target.value)
                        }
                        className="w-full my-2"
                    />
                    <InputError
                        message={errors.question_text}
                        className="mb-1"
                    />
                    <InputLabel>Add Options</InputLabel>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2 items-center">
                            <TextInput
                                name="opt_one"
                                value={data.opt_one}
                                onChange={(e) =>
                                    setData("opt_one", e.target.value)
                                }
                                className={`w-full my-2 ${
                                    data.is_one_correct &&
                                    "outline-dotted outline-1 outline-green-500"
                                }`}
                            />
                            <InputError
                                message={errors.opt_one}
                                className="my-1"
                            />
                            <TextInput
                                type="radio"
                                className="radiostyle"
                                name="is_correct"
                                value="one"
                                ref={optone}
                                onChange={(e) => handleRadio(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <TextInput
                                name="opt_two"
                                value={data.opt_two}
                                onChange={(e) =>
                                    setData("opt_two", e.target.value)
                                }
                                className={`w-full my-2 ${
                                    data.is_two_correct &&
                                    "outline-dotted outline-1 outline-green-500"
                                }`}
                            />
                            <InputError
                                message={errors.opt_two}
                                className="my-1"
                            />
                            <TextInput
                                type="radio"
                                name="is_correct"
                                className="radiostyle"
                                value="two"
                                ref={opttwo}
                                onChange={(e) => handleRadio(e.target.value)}
                            ></TextInput>
                        </div>
                        <div className="flex gap-2 items-center">
                            <TextInput
                                name="opt_three"
                                value={data.opt_three}
                                onChange={(e) =>
                                    setData("opt_three", e.target.value)
                                }
                                className={`w-full my-2 ${
                                    data.is_three_correct &&
                                    "outline-dotted outline-1 outline-green-500"
                                }`}
                            />
                            <InputError
                                message={errors.opt_three}
                                className="my-1"
                            />
                            <TextInput
                                type="radio"
                                className="radiostyle"
                                name="is_correct"
                                value="three"
                                ref={optthree}
                                onChange={(e) => handleRadio(e.target.value)}
                            ></TextInput>
                        </div>
                        <div className="flex gap-2 items-center">
                            <TextInput
                                name="opt_four"
                                value={data.opt_four}
                                onChange={(e) =>
                                    setData("opt_four", e.target.value)
                                }
                                className={`w-full my-2 ${
                                    data.is_four_correct &&
                                    "outline-dotted outline-1 outline-green-500"
                                }`}
                            />
                            <InputError
                                message={errors.opt_four}
                                className="my-1"
                            />
                            <TextInput
                                type="radio"
                                className="radiostyle"
                                name="is_correct"
                                ref={optfour}
                                value="four"
                                onChange={(e) => handleRadio(e.target.value)}
                            />
                        </div>
                    </div>
                    <PrimaryButton className="mt-6 w-full justify-center">
                        Add
                    </PrimaryButton>
                </form>
                <main className="w-1/2 px-2 py-4 max-sm:w-full">
                    {quize?.questions?.map((quest, index) => {
                        return (
                            <h1
                                key={quest.id}
                                className="p-2 rounded-xl bg-gray-100 my-2 text-indigo-900 font-bold"
                            >
                                <span>{++index + "."}</span>{" "}
                                {quest.question_text}
                            </h1>
                        );
                    })}
                </main>
            </div>
        </TeacherLayout>
    );
}
