export const scoreToGrade = (score: number) => {
  if (score >= 4.5) {
    return "A";
  } else if (score < 4.5 && score >= 3.5) {
    return "B";
  } else if (score < 3.5 && score >= 2.5) {
    return "C";
  } else if (score < 2.5 && score >= 1.5) {
    return "D";
  } else if (score < 1.5 && score >= 0.5) {
    return "E";
  } else if (score < 0.5) {
    return "F";
  } else {
    return "-";
  }
};
