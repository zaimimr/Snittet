import { sql } from '@vercel/postgres';
const chunk = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cron_secret = searchParams.get('cron_secret');
  if (cron_secret !== process.env.CRON_SECRET) {
    return Response.json({ data: 'Not authorized' });
  }
  const dataCode = await fetch('https://dbh-data.dataporten-api.no/Tabeller/hentJSONTabellData', {
    method: 'POST',
    body: JSON.stringify(getCodeBody()),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res =>
    res
      .json()
      .then(data => {
        return data.map((item: any) => {
          item.Studiepoeng = parseFloat(item.Studiepoeng);
          return item;
        });
      })
      .catch(() => [])
  );

  chunk(dataCode, 1000).forEach(async (d: Avdelingskode[], i: number) => {
    try {
      const uniqueData = new Map();

      d.forEach(item => {
        const key = `${item.Institusjonskode}-${item.Avdelingskode}-${item.Emnekode}`;
        if (!uniqueData.has(key)) {
          uniqueData.set(key, item);
        }
      });

      const uniqueDataArray = Array.from(uniqueData.values());
      const sql_formated = uniqueDataArray
        .map(
          (subject: Avdelingskode) =>
            `('${subject.Institusjonskode}', '${subject.Institusjonsnavn.replaceAll("'", '')}', '${subject.Avdelingskode}', '${subject.Avdelingsnavn.replaceAll("'", '')}', '${subject.Emnekode}', '${subject.Emnenavn.replaceAll("'", '')}', ${subject.Studiepoeng})`
        )
        .join(', ');
      await sql.query(`
        INSERT INTO subjects 
          ("Institusjonskode", "Institusjonsnavn", "Avdelingskode", "Avdelingsnavn", "Emnekode", "Emnenavn", "Studiepoeng") 
          VALUES ${sql_formated} 
        ON CONFLICT ("Institusjonskode", "Avdelingskode", "Emnekode") 
        DO NOTHING;
      `);
    } catch (e) {
      console.error(e);
    }
  });
  return Response.json({ data: 'ok' });
}

const getCodeBody = () => ({
  tabell_id: 208,
  api_versjon: 1,
  statuslinje: 'N',
  kodetekst: 'J',
  desimal_separator: '.',
  variabler: ['Institusjonskode', 'Avdelingskode', 'Emnekode', 'Emnenavn', 'Studiepoeng'],
  groupBy: ['Institusjonskode', 'Avdelingskode', 'Emnekode', 'Emnenavn', 'Studiepoeng'],
  filter: [
    {
      variabel: 'Emnekode',
      selection: {
        filter: 'all',
        values: ['*']
      }
    }
  ]
});
