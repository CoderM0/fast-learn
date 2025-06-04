import { useForm } from "@inertiajs/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";
export default function RateStars({ id, setClosed }) {
    const stars = [1, 2, 3, 4, 5];

    const { data, post, setData, processing } = useForm({
        rate: 0,
    });
    const addrate = (e) => {
        e.preventDefault();
        post(route("courses.addrate", id), {
            onSuccess: () => setClosed(false),
        });
    };
    return (
        <div className="">
            <div className="flex items-center justify-around gap-1 w-11/12 mx-auto">
                {stars.map((star) => {
                    return data.rate >= star ? (
                        <FaStar
                            color="#756300"
                            key={star}
                            size={"3rem"}
                            onClick={() => setData("rate", star)}
                        />
                    ) : (
                        <FaRegStar
                            color="#756300"
                            size={"3rem"}
                            key={star}
                            onClick={() => setData("rate", star)}
                        />
                    );
                })}
            </div>
            <h1 className="text-center my-2 text-xl">
                {"("}
                {data.rate}
                {")"}
            </h1>
            <form onSubmit={addrate} className="w-full flex justify-center">
                <PrimaryButton type="submit" disabled={processing}>
                    Add Rate
                </PrimaryButton>
            </form>
        </div>
    );
}
