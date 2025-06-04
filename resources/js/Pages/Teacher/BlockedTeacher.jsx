import CustomHead from "@/Components/CustomHead";
import TeacherLayout from "@/Layouts/TeacherLayout";

export default function BlockedTeacher() {
    return (
        <TeacherLayout>
            <CustomHead title={"Blocked"} />
            <div className="flex justify-center items-center w-full h-[50vh] border rounded-xl ">
                <p className="capitalize text-red-500">
                    <span className="text-2xl"> Sorry !</span> You are Blocked
                    From Posting New Content or Editing Existing Courses
                </p>
            </div>
        </TeacherLayout>
    );
}
