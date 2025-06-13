import { useForm } from "@inertiajs/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function ContentControll({ content, index }) {
    const { processing: processingContent, delete: detroyContent } = useForm();
    const deleteContent = (content_id) => {
        detroyContent(route("admin_content.delete_content", content_id));
    };
    return (
        <div className="flex justify-between items-center p-2 pr-0 bg-gray-50 rounded-sm my-2 ">
            <p>
                {index + 1}
                {". "}
                {content.title}{" "}
                <span className="text-green-500">({content.type})</span>
            </p>
            <button
                className="flex disabled:bg-red-300 items-center gap-2 bg-red-500 text-white p-1 rounded-lg"
                onClick={() => deleteContent(content.id)}
                disabled={processingContent}
            >
                {processingContent && (
                    <AiOutlineLoading3Quarters
                        className="text-green-500 animate-spin"
                        color="white"
                    />
                )}
                Delete Content
            </button>
        </div>
    );
}
