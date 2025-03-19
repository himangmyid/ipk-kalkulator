// File: app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { CourseTable } from './components/CourseTable';
import { Summary } from './components/Summary';
import { Charts } from './components/Charts';
import { ThemeToggle } from './components/ThemeToggle';
import { Semester, Course, gradeToPoint } from './types';
import { Tab } from './components/Tab';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'summary' | 'details'>('summary');
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, courses: [], isExpanded: true }
  ]);
  const [darkMode, setDarkMode] = useState(false);

  // Efek untuk mengatur tema
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fungsi untuk menambah semester baru
  const addSemester = () => {
    const nextId = semesters.length > 0 ? Math.max(...semesters.map(s => s.id)) + 1 : 1;
    setSemesters([...semesters, { id: nextId, courses: [], isExpanded: true }]);
  };

  // Fungsi untuk menghapus semester
  const deleteSemester = (semesterId: number) => {
    setSemesters(semesters.filter(semester => semester.id !== semesterId));
  };

  // Fungsi untuk toggle expand/collapse semester
  const toggleSemesterExpand = (semesterId: number) => {
    setSemesters(semesters.map(semester => 
      semester.id === semesterId 
        ? { ...semester, isExpanded: !semester.isExpanded } 
        : semester
    ));
  };

  // Fungsi untuk menambah mata kuliah
  const addCourse = (semesterId: number) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId) {
        return {
          ...semester,
          courses: [...semester.courses, { 
            id: new Date().getTime(), 
            name: '', 
            credits: 2, 
            grade: 'A' 
          }]
        };
      }
      return semester;
    }));
  };

  // Fungsi untuk memperbarui mata kuliah
  const updateCourse = (semesterId: number, updatedCourse: Course) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId) {
        return {
          ...semester,
          courses: semester.courses.map(course => 
            course.id === updatedCourse.id ? updatedCourse : course
          )
        };
      }
      return semester;
    }));
  };

  // Fungsi untuk menghapus mata kuliah
  const deleteCourse = (semesterId: number, courseId: number) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId) {
        return {
          ...semester,
          courses: semester.courses.filter(course => course.id !== courseId)
        };
      }
      return semester;
    }));
  };

  // Hitung data IPK untuk setiap semester
  const semesterData = semesters.map(semester => {
    const totalCredits = semester.courses.reduce((sum, course) => sum + course.credits, 0);
    const totalPoints = semester.courses.reduce((sum, course) => {
      const point = gradeToPoint(course.grade);
      return sum + (point * course.credits);
    }, 0);
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
    
    return {
      id: semester.id,
      totalCredits,
      totalPoints,
      gpa: parseFloat(gpa.toFixed(2))
    };
  });

  // Hitung IPK kumulatif
  const calculateCumulativeGPA = () => {
    const allCourses = semesters.flatMap(semester => semester.courses);
    const totalCredits = allCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalPoints = allCourses.reduce((sum, course) => {
      const point = gradeToPoint(course.grade);
      return sum + (point * course.credits);
    }, 0);
    
    return totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;
  };

  const cumulativeGPA = calculateCumulativeGPA();

  return (
    <main className={`p-4 md:p-8 min-h-screen transition-colors ${darkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-white text-black'}`}>
      <div className="neo-container max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
  <h1 className="neo-title text-2xl md:text-4xl font-bold">IPK Kalkulator</h1>
  <div className="flex items-center gap-4">
    <a
      href="https://trakteer.id/himang/tip"
      target="_blank"
      rel="noopener noreferrer"
      className="neo-button py-2 px-4 flex items-center text-sm md:text-base bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors dark:text-gray-900"
    >
      🎁 Donasi
    </a>
    <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
  </div>
</div>

        <div className="neo-tabs mb-6">
          <Tab  
            isActive={activeTab === 'summary'} 
            onClick={() => setActiveTab('summary')}
            label="Ringkasan"
          />
          <Tab 
            isActive={activeTab === 'details'} 
            onClick={() => setActiveTab('details')}
            label="Detail Mata Kuliah"
          />
        </div>

        {activeTab === 'summary' && (
          <Summary 
            semesterData={semesterData} 
            cumulativeGPA={cumulativeGPA} 
          />
        )}

        {activeTab === 'details' && (
          <div className="space-y-8">
            {semesters.map((semester) => (
              <CourseTable
                key={semester.id}
                semester={semester}
                onAddCourse={addCourse}
                onUpdateCourse={updateCourse}
                onDeleteCourse={deleteCourse}
                onToggleExpand={toggleSemesterExpand}
                onDeleteSemester={deleteSemester}
              />
            ))}
            <button 
              onClick={addSemester}
              className="neo-button py-2 px-4 mt-4 w-full"
            >
              + Tambah Semester Baru
            </button>
          </div>
        )}

        <div className="mt-10">
          <h2 className="neo-subtitle text-xl font-bold mb-4">Visualisasi IPK</h2>
          <Charts 
            semesterData={semesterData} 
            cumulativeGPA={cumulativeGPA} 
            darkMode={darkMode}
          />
        </div>
      </div>
       {/* Footer */}
      <footer className="text-center py-4 mt-10 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Dibuat dengan ❤️ oleh{' '}
          <a
            href="http://s.id/himang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Himang
          </a>
        </p>
      </footer>
    </main>
  );
}