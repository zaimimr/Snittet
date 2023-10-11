"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function setGrade(
  grade: string,
  user_id: string,
  course_id: string
) {
  "use server";
  console.log(grade, user_id, course_id);
  await sql.query(
    `UPDATE user_course SET grade = '${grade}' WHERE user_id = '${user_id}' AND course = '${course_id}'`
  );
  revalidatePath("/");
}
