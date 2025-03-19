// File: components/Summary.tsx
import React from 'react';

type SemesterSummary = {
  id: number;
  totalCredits: number;
  totalPoints: number;
  gpa: number;
};

type SummaryProps = {
  semesterData: SemesterSummary[];
  cumulativeGPA: number;
};

export const Summary: React.FC<SummaryProps> = ({ semesterData, cumulativeGPA }) => {
  return (
    <div className="space-y-6">
      <div className="neo-box p-6">
        <h2 className="text-xl font-bold mb-4">IPK Kumulatif</h2>
        <div className="text-5xl font-bold text-center py-8">{cumulativeGPA.toFixed(2)}</div>
      </div>

      <div className="neo-box p-6">
        <h2 className="text-xl font-bold mb-4">IPK Per Semester</h2>
        <div className="overflow-x-auto">
          <table className="w-full neo-table">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Semester</th>
                <th className="px-4 py-2 text-center">Total SKS</th>
                <th className="px-4 py-2 text-center">Total Points</th>
                <th className="px-4 py-2 text-center">IPK</th>
              </tr>
            </thead>
            <tbody>
              {semesterData.map((semester) => (
                <tr key={semester.id}>
                  <td className="px-4 py-2">Semester {semester.id}</td>
                  <td className="px-4 py-2 text-center">{semester.totalCredits}</td>
                  <td className="px-4 py-2 text-center">{semester.totalPoints.toFixed(2)}</td>
                  <td className="px-4 py-2 text-center font-bold">{semester.gpa.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};