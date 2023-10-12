import { ApiUserCourse_CourseType } from "@/utils/types";
import GradePicker from "./gradePicker";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import CardActionButton from "./cardActionButton";

export default function Card({ course }: { course: ApiUserCourse_CourseType }) {
    const cookieStore = cookies()
    const user_id = cookieStore.get("user_id")


    async function deleteCard(course: ApiUserCourse_CourseType, user_id: string) {
        "use server"
        sql.query(`DELETE FROM user_course WHERE user_id = '${user_id}' AND course = '${course.course}'`)
        revalidatePath("/")
    }

    async function changeGradeType(course: ApiUserCourse_CourseType, user_id: string) {
        "use server"
        sql.query(`UPDATE user_course SET is_grade = NOT is_grade WHERE user_id = '${user_id}' AND course = '${course.course}'`)
        revalidatePath("/")
    }

    return (
        <div className="relative">
            <div className="min-w-[20rem] w-full relative p-3 rounded-md bg-custom-radial border border-white border-opacity-30">
                <div className="absolute top-1 right-1 flex gap-1 " >
                    <div className="text-error-main hover:text-green-500 cursor-pointer" >
                        {
                            user_id && <CardActionButton child={
                                <svg className="stroke-white w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 4L21 7M21 7L18 10M21 7H7C4.79086 7 3 8.79086 3 11M6 20L3 17M3 17L6 14M3 17H17C19.2091 17 21 15.2091 21 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            } actionFunction={changeGradeType} course={course} user_id={user_id?.value} />
                        }
                    </div>
                    <div className=" text-error-main hover:text-green-500 cursor-pointer" >
                        {
                            user_id && <CardActionButton child={
                                <svg className="stroke-white w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            } actionFunction={deleteCard} course={course} user_id={user_id?.value} />
                        }
                    </div>
                </div>
                <h3 className="truncate text-4xl">{course.course}</h3>
                <p className="truncate">{course.name}</p>
                <div className="flex justify-between items-center">
                    <p>{course.credits} stp.</p>
                    <p>
                        avg: unknown
                    </p>
                </div>
                {
                    user_id &&
                    <GradePicker course={course} user_id={user_id} />
                }
            </div>
            <div className="absolute bottom-[-0.5rem] w-full h-2 bg-black rounded-full opacity-50 blur-md mt-2"></div>
        </div>
    );
};
