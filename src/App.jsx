import { useState, useEffect } from "react";
import Semester from "./components/semester";
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
    </div>
  );
}
