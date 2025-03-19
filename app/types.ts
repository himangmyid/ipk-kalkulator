// File: lib/types.ts
export type GradeOption = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'E';

export interface Course {
  id: number;
  name: string;
  credits: number;
  grade: GradeOption;
}

export interface Semester {
  id: number;
  courses: Course[];
  isExpanded: boolean;
}

// Konversi grade huruf ke poin (skala 4-1)
export const gradeToPoint = (grade: GradeOption): number => {
  switch (grade) {
    case 'A+': return 4.0;
    case 'A': return 4.0;
    case 'A-': return 3.7;
    case 'B+': return 3.3;
    case 'B': return 3.0;
    case 'B-': return 2.7;
    case 'C+': return 2.3;
    case 'C': return 2.0;
    case 'C-': return 1.7;
    case 'D+': return 1.3;
    case 'D': return 1.0;
    case 'D-': return 0.7;
    case 'E': return 0.0;
    default: return 0.0;
  }
};