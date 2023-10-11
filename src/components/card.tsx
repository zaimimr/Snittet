import { ApiUserCourse_CourseType } from "@/utils/types";
import GradePicker from "./gradePicker";
import { cookies } from "next/headers";


export default function Card({ course }: { course: ApiUserCourse_CourseType }) {
    const cookieStore = cookies()
    const user_id = cookieStore.get("user_id")
    return (
        <div className="min-w-[20rem] w-full relative p-3 rounded-md bg-custom-radial border border-white border-opacity-30">
            <div className="absolute top-0 right-7 text-primary-light hover:text-green-500 cursor-pointer" >
                {/* <SwapHorizIcon /> */}
                {"m"}
            </div>
            <div className="absolute top-0 right-2 text-error-main hover:text-green-500 cursor-pointer" >
                {/* <ClearIcon /> */}
                {"x"}
            </div>
            <h3 className="truncate text-4xl">{course.course}</h3>
            <p className="truncate">{course.name}</p>
            <div className="flex justify-between items-center">
                <p>{course.credits} stp.</p>
                <p>
                    avg: unknown
                </p>
            </div>
            <GradePicker course={course} user_id={user_id} />
        </div>
    );
};
