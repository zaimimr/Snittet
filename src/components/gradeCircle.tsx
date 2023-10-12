import { ApiUserCourse_CourseType } from "@/utils/types";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

const GradeCircle = async () => {

    const cookieStore = cookies()
    const user_id = cookieStore.get("user_id")
    const TotalGradeData = user_id?.value ? await sql.query(`
    WITH GradeValues AS (
        SELECT 
            user_id,
            CASE 
                WHEN grade = 'A' THEN 5
                WHEN grade = 'B' THEN 4
                WHEN grade = 'C' THEN 3
                WHEN grade = 'D' THEN 2
                WHEN grade = 'E' THEN 1
                ELSE NULL
            END AS grade_value,
            c.credits
        FROM user_course uc
        JOIN course c ON uc.course = c.id
        WHERE uc.user_id = '${user_id?.value}' AND uc.grade NOT IN ('F', 'G', 'H') AND uc.grade IS NOT NULL
    )
    
    , CalculatedGrades AS (
        SELECT 
            user_id,
            COALESCE(ROUND(SUM(grade_value * credits) * 100.0 / NULLIF(SUM(credits), 0)) / 100, 0) AS average_grade,
            SUM(credits) AS total_credits
        FROM GradeValues
        GROUP BY user_id
    )
    
    SELECT 
        user_id,
        average_grade,
        CASE 
            WHEN average_grade >= 4.5 THEN 'A'
            WHEN average_grade >= 3.5 THEN 'B'
            WHEN average_grade >= 2.5 THEN 'C'
            WHEN average_grade >= 1.5 THEN 'D'
            WHEN average_grade >= 0.5 THEN 'E'
            ELSE 'F'
        END AS letter_grade,
        total_credits
    FROM CalculatedGrades;
    
    `) : { rows: [] }
    const data = TotalGradeData.rows?.[0]
    return (
        <div className="flex flex-col items-center justify-center bg-custom-radial rounded-full w-64 h-64 relative shadow-md  border border-white border-opacity-30">
            <div className="mt-12 text-center text-8xl">
                {data?.letter_grade || ""}
            </div>
            <div className="text-center text-3xl">
                {data?.average_grade || "Velg et fag or karakter"}
            </div>
            <div className="text-center">
                {`${data?.total_credits || ""} ${data?.total_credits ? "stp." : ""}`}
            </div>
            <div className="absolute bottom-0 w-48 h-2.5 bg-black rounded-full opacity-50 blur-md mt-2"></div>
        </div>
    );
};

export default GradeCircle;
