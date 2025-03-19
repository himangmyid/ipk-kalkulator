// File: components/CourseTable.tsx
import React from 'react';
import { Course, Semester, GradeOption, gradeToPoint } from '../types';

type CourseTableProps = {
  semester: Semester;
  onAddCourse: (semesterId: number) => void;
  onUpdateCourse: (semesterId: number, course: Course) => void;
  onDeleteCourse: (semesterId: number, courseId: number) => void;
  onToggleExpand: (semesterId: number) => void;
  onDeleteSemester: (semesterId: number) => void;
};

export const CourseTable: React.FC<CourseTableProps> = ({
  semester,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onToggleExpand,
  onDeleteSemester
}) => {
  const gradeOptions: GradeOption[] = [
    'A+', 'A', 'A-', 
    'B+', 'B', 'B-', 
    'C+', 'C', 'C-', 
    'D+', 'D', 'D-', 
    'E'
  ];

  const creditOptions = [1, 2, 3, 4];

  return (
    <div className="neo-box p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button 
            onClick={() => onToggleExpand(semester.id)}
            className="mr-2 neo-icon-button w-6 h-6 flex items-center justify-center"
          >
            {semester.isExpanded ? '−' : '+'}
          </button>
          <h3 className="text-lg font-bold">Semester {semester.id}</h3>
        </div>
        <button 
          onClick={() => onDeleteSemester(semester.id)}
          className="neo-danger-button py-1 px-3 text-sm"
          aria-label="Hapus semester"
        >
          Hapus
        </button>
      </div>

      {semester.isExpanded && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full neo-table">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Mata Kuliah</th>
                  <th className="px-4 py-2 text-center">SKS</th>
                  <th className="px-4 py-2 text-center">Grade</th>
                  <th className="px-4 py-2 text-center">Point (4-1)</th>
                  <th className="px-4 py-2 text-center">Points (0-12)</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {semester.courses.map((course) => {
                  // Grade point (skala 4-1)
                  const point = gradeToPoint(course.grade);
                  
                  // Total points (range 0-12 = credit * point)
                  const points = point * course.credits;

                  return (
                    <tr key={course.id}>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => onUpdateCourse(semester.id, { ...course, name: e.target.value })}
                          className="neo-input w-full md:min-w-[200px]"
                          placeholder="Nama Mata Kuliah"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={course.credits}
                          onChange={(e) => onUpdateCourse(semester.id, { ...course, credits: parseInt(e.target.value) })}
                          className="neo-select w-full"
                        >
                          {creditOptions.map((credit) => (
                            <option key={credit} value={credit}>
                              {credit}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={course.grade}
                          onChange={(e) => onUpdateCourse(semester.id, { ...course, grade: e.target.value as GradeOption })}
                          className="neo-select w-full"
                        >
                          {gradeOptions.map((grade) => (
                            <option key={grade} value={grade}>
                              {grade}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2 text-center">
                        {point.toFixed(1)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {points.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => onDeleteCourse(semester.id, course.id)}
                          className="neo-danger-button py-1 px-2 text-sm"
                          aria-label="Hapus mata kuliah"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => onAddCourse(semester.id)}
            className="neo-button py-2 px-4 mt-4 w-full"
          >
            + Tambah Mata Kuliah
          </button>
        </>
      )}
    </div>
  );
};