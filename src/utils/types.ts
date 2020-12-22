export type IStudies = {
    code: string;
    norwegian_name: string;
    taught_in_autumn: boolean;
    credit: number;
    average: number;
    currentGrade: number | null;
  };

  export type IMinStudy = {
    code: string;
    norwegian_name: string;
  };
