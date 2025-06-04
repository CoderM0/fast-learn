import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";

export default function CreateQuize({ quize }) {
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

        post(route("admin.addquestion", quize.id));
        reset();
        resetradio();
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
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {`${quize.name}`}
                </h2>
            }
        >
            <Head title={`${quize.name}`} />
            <div className="flex mt-5 max-sm:flex-col h-[85vh] overflow-y-auto">
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
                    <div className="flex justify-between">
                        <div className="flex flex-col items-center">
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
                                onChange={(e) => handleRadio(e.target.value)}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col items-center">
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
                                onChange={(e) => handleRadio(e.target.value)}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col items-center">
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
                                onChange={(e) => handleRadio(e.target.value)}
                            ></TextInput>
                        </div>
                        <div className="flex flex-col items-center">
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
                                value="four"
                                onChange={(e) => handleRadio(e.target.value)}
                            ></TextInput>
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
                                className="p-2 rounded-xl bg-blue-100 my-2 text-black font-bold"
                            >
                                <span>{++index + "."}</span>{" "}
                                {quest.question_text}
                            </h1>
                        );
                    })}
                </main>
            </div>
        </AdminLayout>
    );
}
