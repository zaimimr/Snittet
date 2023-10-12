import { sql } from "@vercel/postgres";
import {
  courseBody,
  getDbhData,
  gradeBody,
  instutitionBody,
  studyProgramBody,
} from "./data";
import {
  InstituteType,
  CourseType,
  GradeType,
  StudyProgramType,
} from "./types";

export const init = async () => {
  await sql.query(`
    CREATE TABLE IF NOT EXISTS institute (
        id INT PRIMARY KEY,
        name TEXT,
        short TEXT
    );`);
  await sql.query(`
    CREATE TABLE IF NOT EXISTS studyprogram (
        id CHAR(12) PRIMARY KEY,
        name TEXT,
        institute INT REFERENCES institute(id) ON DELETE CASCADE
    );`);
  await sql.query(`CREATE TABLE IF NOT EXISTS course (
        id CHAR(20) PRIMARY KEY,
        name TEXT,
        credits REAL,
        nus_code CHAR(10),
        studyprogram CHAR(12) REFERENCES studyprogram(id) ON DELETE CASCADE,
        institute INT REFERENCES institute(id) ON DELETE CASCADE
    );`);
  await sql.query(`CREATE TABLE IF NOT EXISTS grade (
        id SERIAL PRIMARY KEY,
        course CHAR(20) REFERENCES course(id) ON DELETE CASCADE,
        grade CHAR(2),
        year INT,
        semester INT,
        institute INT REFERENCES institute(id) ON DELETE CASCADE,
        total_count INT,
        female_count INT,
        male_count INT,
        
        UNIQUE (course, grade, year, semester)
    );`);

  await sql.query(`CREATE TABLE IF NOT EXISTS user_course (
    id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    course CHAR(20) REFERENCES course(id) ON DELETE CASCADE NOT NULL,
    is_grade BOOLEAN NOT NULL DEFAULT TRUE,
    grade CHAR(2),
    
    UNIQUE (user_id, course)
);`);

  await sql.query(`CREATE TABLE IF NOT EXISTS global_message (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'info'
);`);

  const ytop = 2;

  const instutition: InstituteType[] = await getIntituteAndInsertIntoDB();
  const ilist = instutition
    .filter((i) => !i.Kortnavn.includes("UNIT"))
    .map((i: any) => i.Institusjonskode);
  await getSPAndInsertIntoDB(ilist, ytop);
  await getCoursesAndInsertIntoDB(ilist, ytop);
  const years = Array.from(Array(ytop).keys()).map(
    (i) => new Date().getFullYear() - i
  );
  await Promise.all(
    ilist.map(async (institute) => {
      return Promise.all(
        years.map(async (year) => {
          await gradeQuery(gradeBody, institute, year, 1);
          await gradeQuery(gradeBody, institute, year, 3);
        })
      );
    })
  );

  console.log("DONE");
  return "Data is fetched!! Good job!";
};

const getIntituteAndInsertIntoDB = async () => {
  const instutition: InstituteType[] = await getDbhData(instutitionBody);
  console.log("Institute: ", instutition.length);
  const insQuery = instutition
    .map((institute) => {
      return `INSERT INTO institute (id, name, short) VALUES (${institute.Institusjonskode}, '${institute.Institusjonsnavn}', '${institute.Kortnavn}') ON CONFLICT (id) DO UPDATE SET name = '${institute.Institusjonsnavn}', short = '${institute.Kortnavn}';`;
    })
    .join("");
  await sql.query(insQuery);
  return instutition;
};

const chunk = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const getSPAndInsertIntoDB = async (ilist: any, ytop: any) => {
  const studyProgram: StudyProgramType[] = await getDbhData(
    studyProgramBody,
    ilist,
    ytop
  );
  console.log(
    "StudyProgram: ",
    [...new Set(studyProgram.map((item) => item.Studieprogramkode))].length
  );
  const stpQuery = chunk(studyProgram, 1000).map((chunk) => {
    return chunk
      .map((program) => {
        return `INSERT INTO studyprogram (id, name, institute) VALUES ('${
          program.Studieprogramkode
        }', '${program.Studieprogramnavn.replaceAll("'", "''")}', ${
          program.Institusjonskode
        }) ON CONFLICT (id) DO UPDATE SET name = '${program.Studieprogramnavn.replaceAll(
          "'",
          "''"
        )}', institute = ${program.Institusjonskode};`;
      })
      .join("");
  });
  await stpQuery.map(async (query) => {
    await sql.query(query);
  });
};

const getCoursesAndInsertIntoDB = async (ilist: any, ytop: any) => {
  const courses: CourseType[] = await getDbhData(courseBody, ilist, ytop);
  console.log(
    "Courses: ",
    [...new Set(courses.map((item) => item.Emnekode))].length
  );
  const courseQuery = chunk(courses, 1000).map((chunk) => {
    return chunk
      .map((course) => {
        return `INSERT INTO course (id, name, credits, nus_code, studyprogram, institute) VALUES ('${
          course.Emnekode
        }', '${course.Emnenavn.replaceAll("'", "''")}', ${
          course.Studiepoeng
        }, '${course["NUS-kode"]}', '${course.Studieprogramkode}', ${
          course.Institusjonskode
        }) ON CONFLICT (id) DO UPDATE SET name = '${course.Emnenavn.replaceAll(
          "'",
          "''"
        )}', credits = ${course.Studiepoeng}, nus_code = '${
          course["NUS-kode"]
        }', studyprogram = '${course.Studieprogramkode}', institute = ${
          course.Institusjonskode
        };`;
      })
      .join("");
  });
  await courseQuery.map(async (query) => {
    await sql.query(query);
  });
};

const gradeQuery = async (
  gradeBody: any,
  institute: number,
  year: number,
  semester: number
) => {
  console.log("---");
  console.log(institute, year, semester);

  try {
    const grades: GradeType[] = await getDbhData(
      gradeBody,
      institute,
      year,
      semester
    );
    console.log(
      "Grades: ",
      [
        ...new Set(
          grades.map(
            (item) =>
              `${item.Årstall}, ${item.Semester}, ${item.Emnekode}, ${item.Karakter}`
          )
        ),
      ].length
    );

    const courseQuery = chunk(grades, 1000).map((chunk) => {
      return chunk
        .map((grade) => {
          return `INSERT INTO grade (course, grade, year, semester, institute, total_count, female_count, male_count) VALUES ('${grade.Emnekode}', '${grade.Karakter}', ${year}, ${semester}, ${institute}, ${grade["Antall kandidater totalt"]}, ${grade["Antall kandidater kvinner"]}, ${grade["Antall kandidater menn"]}) ON CONFLICT (course, grade, year, semester) DO UPDATE SET total_count = ${grade["Antall kandidater totalt"]}, female_count = ${grade["Antall kandidater kvinner"]}, male_count = ${grade["Antall kandidater menn"]};`;
        })
        .join("");
    });
    await courseQuery.map(async (query) => {
      await sql.query(query);
    });
  } catch (e) {
    console.log("Error", e);
  }
};
