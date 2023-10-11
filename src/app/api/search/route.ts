import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get("searchTerm");
  const courses = await sql.query(
    `SELECT * FROM course WHERE UPPER(id) LIKE UPPER('%${searchTerm}%') OR UPPER(name) LIKE UPPER('%${searchTerm}%') LIMIT 25;`
  );
  return new Response(JSON.stringify(courses.rows), {
    headers: { "content-type": "application/json" },
  });
}
