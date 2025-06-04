import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Modal from "./Modal";
import RateStars from "./RateStars";

export default function ModalBox({ coursename, courseid }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="">
            <button
                onClick={() => setOpenModal(true)}
                className="text-lorange flex items-center gap-1"
            >
                Rate <FaStar />
            </button>
            <Modal show={openModal}>
                <div className=" bg-white">
                    <button
                        type="button"
                        form=""
                        className="mx-2 bg-blue-500 text-white  rounded-full "
                        onClick={() => setOpenModal(false)}
                    >
                        <MdCancel size={"1.5rem"} />
                    </button>
                    <div className=" my-4">
                        <h1 className="my-2 p-2 text-center ">
                            Rate {coursename} Course
                        </h1>
                        <RateStars id={courseid} setClosed={setOpenModal} />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
