import InputLabel from "./InputLabel";

export default function QuestionField({
    op,
    setData,
    questId,
    data,
    isResult,
}) {
    console.log(data);
    return (
        <div key={op.id} className="w-full px-2">
            <InputLabel
                htmlFor={op.id}
                className={`text-white cursor-pointer w-full block mx-2 py-2 rounded-lg  text-center ${
                    Object.values(data).includes(`op-${op.id}`)
                        ? "bg-blue-500"
                        : "bg-gray-300"
                }`}
            >
                {" "}
                {op.option_text}
            </InputLabel>
            <input
                type="radio"
                name="answer"
                id={op.id}
                className="hidden"
                value={op.id}
                onChange={(e) => {
                    setData(`${questId}`, op.is_correct);
                    setData(`op-${questId}`, `op-${op.id}`);
                }}
            />
        </div>
    );
}
