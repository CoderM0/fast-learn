import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
export default function DeleteStudent({ student, className }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const {
        delete: destroy,
        processing,
        reset,

        clearErrors,
    } = useForm({});

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("admin.student.destroy", student.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <div>
            <section className={` ${className}`}>
                <button
                    className="border border-red-500 flex items-center gap-1 bg-red-500 text-white rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                    onClick={confirmUserDeletion}
                >
                    Delete <MdDeleteForever size={"1.3rem"} />
                </button>

                <Modal
                    show={confirmingUserDeletion}
                    onClose={closeModal}
                    className="  h-1/4 "
                >
                    <form onSubmit={deleteUser} className="p-2">
                        <h2 className="text-lg font-medium text-gray-900">
                            Are you sure you want to delete{" "}
                            <span className="font-bold">
                                {" "}
                                {student.full_name}
                            </span>{" "}
                            account?
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Once student account is deleted, all of its
                            resources will be permanently deleted and they will
                            lose access to thier enrolled courses.
                        </p>
                        <div className="mt-1 flex justify-end">
                            <SecondaryButton onClick={closeModal}>
                                Cancel
                            </SecondaryButton>

                            <DangerButton
                                className="ms-3"
                                disabled={processing}
                            >
                                Delete Account
                            </DangerButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </div>
    );
}
