export const getDbhData = async (
  body: (...args: any[]) => unknown,
  ...args: any[]
) => {
  const url = "https://dbh.hkdir.no/api/Tabeller/hentJSONTabellData";
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body(...args)),
    cache: "no-store" as RequestCache,
  };
  return await fetch(url, options).then((response) => response.json());
};


export const instutitionBody = () => ({
  tabell_id: 211,
  api_versjon: 1,
  statuslinje: "N",
  begrensning: "*",
  kodetekst: "N",
  desimal_separator: ".",
  variabler: ["Institusjonskode", "Institusjonsnavn", "Kortnavn"],
  sortBy: ["Institusjonskode"],
  filter: [
    {
      variabel: "Institusjonstypekode",
      selection: {
        filter: "item",
        values: [
          "11", // universitet
        ],
        exclude: [""],
      },
    },
  ],
});


export const studyProgramBody = (institutes: number[], top: number) => ({
  tabell_id: 347,
  api_versjon: 1,
  statuslinje: "N",
  begrensning: "*",
  kodetekst: "N",
  desimal_separator: ".",
  variabler: [
    "Institusjonskode",
    "Årstall",
    "Studieprogramkode",
    "Studieprogramnavn",
    "NUS-kode",
  ],
  sortBy: ["Studieprogramkode"],
  filter: [
    {
      variabel: "Institusjonskode",
      selection: {
        filter: "item",
        values: institutes,
      },
    },
    {
      variabel: "Årstall",
      selection: {
        filter: "top",
        values: [top],
        exclude: [""],
      },
    },
  ],
});


export const courseBody = (institutes: number[], top: number) => ({
  tabell_id: 208,
  api_versjon: 1,
  statuslinje: "N",
  begrensning: "*",
  kodetekst: "N",
  desimal_separator: ".",
  variabler: [
    "Emnekode",
    "Emnenavn",
    "NUS-kode",
    "Studiepoeng",
    "Institusjonskode",
    "Studieprogramkode",
  ],
  sortBy: ["Emnekode"],
  filter: [
    {
      variabel: "Institusjonskode",
      selection: {
        filter: "item",
        values: institutes,
      },
    },
    {
      variabel: "Årstall",
      selection: {
        filter: "top",
        values: [top],
        exclude: [""],
      },
    },
  ],
});


export const gradeBody = (
  institute: number,
  year: number,
  semester: 1 | 3
) => ({
  tabell_id: 308,
  api_versjon: 1,
  statuslinje: "N",
  begrensning: "*",
  kodetekst: "N",
  desimal_separator: ".",
  groupBy: ["Emnekode", "Karakter"],
  sortBy: ["Emnekode", "Karakter"],
  variabler: ["*"],
  filter: [
    {
      variabel: "Institusjonskode",
      selection: {
        filter: "item",
        values: [institute],
        exclude: [""],
      },
    },
    {
      variabel: "Årstall",
      selection: {
        filter: "item",
        values: [year],
        exclude: [""],
      },
    },
    {
      variabel: "Semester",
      selection: {
        filter: "item",
        values: [semester],
        exclude: [""],
      },
    },
  ],
});
