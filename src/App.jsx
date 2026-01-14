import { useState, useEffect } from "react";
import Semester from "./Semester";
import "./styles.css";

const STORAGE_KEY = "gpa-data";

export default function App() {

  // Load from localStorage on first render
  const [semesters, setSemesters] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [{ name: "Semester 1", subjects: [] }];
  });

  // Save to localStorage whenever semesters change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(semesters));
  }, [semesters]);

  const calculateTotalGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    const gradePoints = {
      A:4,"A-":3.7,"B+":3.3,B:3,"B-":2.7,
      "C+":2.3,C:2,D:1,F:0
    };

    semesters.forEach(sem => {
      sem.subjects.forEach(s => {
        if (s.grade && s.credits > 0) {
          totalPoints += gradePoints[s.grade] * s.credits;
          totalCredits += s.credits;
        }
      });
    });

    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const addSemester = () => {
    setSemesters([
      ...semesters,
      { name: `Semester ${semesters.length + 1}`, subjects: [] }
    ]);
  };

  const getGpaClass = (gpa) => {
  if (gpa < 2) return "gpa-low";
  if (gpa < 3) return "gpa-mid";
  return "gpa-high";
};

  const totalGPA = calculateTotalGPA();

  return (
    <div className="container">
      <div className="gpa-header">
        <h1>Total GPA</h1>
          <span className={getGpaClass(Number(totalGPA))}>
              {totalGPA}
          </span>
      </div>

      
      {semesters.map((sem, i) => (
        <Semester
        key={i}
        semester={sem}
        canRemove={semesters.length > 1}
        onRemove={() => {
          setSemesters(semesters.filter((_, idx) => idx !== i));
          }}
        onUpdate={(updated) => {
        const copy = [...semesters];
        copy[i] = updated;
        setSemesters(copy);
        }}
      />
      ))}

      <button className="add-sem" onClick={addSemester}>
        + Add Semester
      </button>
      <footer className="watermark">
      <a
        href="https://github.com/ahmedtarek25"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ahmed Tarek GitHub"
     >
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.41 7.86 10.94.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.18 1.17a11.1 11.1 0 0 1 5.8 0c2.21-1.48 3.18-1.17 3.18-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.37-5.25 5.65.41.35.77 1.04.77 2.1v3.11c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
      </svg>
      <span>Developed by Ahmed Tarek</span>
      </a>
      </footer>

    </div>
  );
}
