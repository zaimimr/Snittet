import { sql } from '@vercel/postgres';
export async function POST(req: Request) {
  const body = await req.json();
  try {
    sql`INSERT INTO items ("Institusjonskode", "Avdelingskode", "Emnekode", "Studiepoeng", "Grade", "RandomId") VALUES (${body.Institusjonskode}, ${body.Avdelingskode}, ${body.Emnekode}, ${body.Studiepoeng}, ${body.Grade}, ${body.RandomId}) ON CONFLICT("Emnekode", "RandomId") DO UPDATE SET "Grade"=${body.Grade};`;
  } catch (e) {
    console.error(e);
  }
  return Response.json({ data: 'Ok' });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get('subject');

  if (!subject) {
    return Response.json([]);
  }
  const input = `%${subject}%`;
  const data = (
    await sql`SELECT "Institusjonskode", "Institusjonsnavn", "Avdelingskode", "Avdelingsnavn", "Emnekode", "Emnenavn", "Studiepoeng" FROM subjects WHERE "Emnekode" ILIKE ${input} OR "Emnenavn" ILIKE ${input}  LIMIT 10;`
  ).rows.map((item: any) => {
    item.Studiepoeng = parseFloat(item.Studiepoeng);
    item.Grade = null;
    return { value: item, label: `${item.Emnekode} | ${item.Emnenavn}` };
  });

  return Response.json(data);
}
