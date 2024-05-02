export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function gradeToLetter(grade: number): string {
  if (grade >= 4.5 && grade <= 5.0) {
    return 'A';
  } else if (grade >= 3.5 && grade <= 4.49) {
    return 'B';
  } else if (grade >= 2.5 && grade <= 3.49) {
    return 'C';
  } else if (grade >= 1.5 && grade <= 2.49) {
    return 'D';
  } else if (grade >= 1.0 && grade <= 1.49) {
    return 'E';
  } else if (grade >= 0.0 && grade <= 0.99) {
    return 'F';
  } else {
    return '-';
  }
}
