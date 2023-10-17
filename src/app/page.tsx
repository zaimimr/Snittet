import AdSense from "@/components/ads";
import Card from "@/components/card";
import GradeCircle from "@/components/gradeCircle";
import SearchBar from "@/components/searchbar";
import { ApiCourseType, ApiUserCourse_CourseType } from "@/utils/types";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function Home() {

  const cookieStore = cookies()

  const user_id = cookieStore.get("user_id")

  const data = user_id?.value ? await sql.query(`SELECT user_course.id, course, is_grade, grade, name, credits
  FROM user_course
  LEFT JOIN course 
  ON user_course.course = course.id 
  WHERE user_id = '${user_id?.value}'
  ORDER BY user_course.id ASC`) : { rows: [] }

  async function addUserCourse(course: ApiCourseType) {
    "use server"
    await sql.query(`INSERT INTO user_course (user_id, course) VALUES ('${user_id?.value}', '${course.id}')`)
    revalidatePath("/")
  }
  return (
    <main className="flex justify-center flex-col items-center px-10 gap-6">
      <GradeCircle />
      <SearchBar addUserCourse={addUserCourse} />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
        {data.rows.map((course: ApiUserCourse_CourseType, index: number) => (
          <Card key={index} course={course} />
        ))}
        <AdSense adSlot="9152791702" />
      </div>
    </main>
  )
}
