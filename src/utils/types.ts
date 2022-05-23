export type IStudies = {
    code: string;
    norwegian_name: string;
    taught_in_autumn: boolean;
    credit: number;
    average: number;
    grade: boolean;
    currentGrade: number | null | "fail" | "pass";
  };

  export type IMinStudy = {
    code: string;
    norwegian_name: string;
  };
