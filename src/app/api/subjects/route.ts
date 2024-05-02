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
  const limit = searchParams.get('limit') || undefined;
  const institution = searchParams.get('institution') || undefined;

  if (!subject) {
    return Response.json([]);
  }

  const dataCode = await fetch('https://dbh-data.dataporten-api.no/Tabeller/hentJSONTabellData', {
    method: 'POST',
    body: JSON.stringify(getCodeBody(subject, institution, limit)),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res =>
    res
      .json()
      .then(data => {
        return data.map((item: any) => {
          item.Studiepoeng = parseFloat(item.Studiepoeng);
          item.Grade = null;
          return { value: item, label: `${item.Emnekode} | ${item.Emnenavn}` };
        });
      })
      .catch(() => [])
  );

  const totalData = [...dataCode];

  return Response.json(totalData);
}

const getCodeBody = (subject: string, institution: string = '1150', limit: string = '10') => ({
  tabell_id: 208,
  api_versjon: 1,
  statuslinje: 'N',
  begrensning: limit,
  kodetekst: 'J',
  desimal_separator: '.',
  variabler: ['Institusjonskode', 'Avdelingskode', 'Emnekode', 'Emnenavn', 'Studiepoeng'],
  groupBy: ['Institusjonskode', 'Avdelingskode', 'Emnekode', 'Emnenavn', 'Studiepoeng'],
  filter: [
    {
      variabel: 'Emnekode',
      selection: {
        filter: 'like',
        values: [`%${subject}%`]
      }
    }
  ]
});
