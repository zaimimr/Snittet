export type InstituteType = {
  Institusjonskode: number;
  Institusjonsnavn: string;
  Kortnavn: string;
};
export type StudyProgramType = {
  Institusjonskode: number;
  Årstall: number;
  Studieprogramkode: string;
  Studieprogramnavn: string;
  "NUS-kode": string;
};
export type CourseType = {
  Emnekode: string;
  Emnenavn: string;
  "NUS-kode": string;
  Studiepoeng: number;
  Institusjonskode: number;
  Studieprogramkode: string;
};
export type ApiCourseType = {
  credits: number;
  id: string;
  institute: number;
  name: string;
  nus_code: string;
  studyprogram: string;
};
export type GradeType = {
  Emnekode: string;
  Karakter: string;
  Årstall?: number | undefined;
  Semester?: number | undefined;
  "Antall kandidater totalt": number;
  "Antall kandidater kvinner": number;
  "Antall kandidater menn": number;
};
export type ApiUserCourseType = {
  id: number;
  user_id: string;
  course: string;
  is_grade: boolean;
  grade: string;
};
export type ApiUserCourse_CourseType = {
  course: string;
  is_grade: boolean;
  grade: string | null;
  name: string;
  credits: number;
};
