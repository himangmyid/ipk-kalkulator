export const gradeToPoint = (grade: string): number => {
    const gradeMap: { [key: string]: number } = {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'C-': 1.7,
      'D+': 1.3,
      'D': 1.0,
      'D-': 0.7,
      'E': 0.0,
    };
    return gradeMap[grade] || 0;
  };