import SubjectRow from "./SubjectRow";

const gradePoints = {
  A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0,
  "B-": 2.7, "C+": 2.3, C: 2.0, D: 1.0, F: 0.0
};

export default function Semester({ semester, onUpdate, onRemove, canRemove }) {
  const calcGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semester.subjects.forEach(s => {
      if (s.grade && s.credits > 0) {
        totalPoints += gradePoints[s.grade] * s.credits;
        totalCredits += s.credits;
      }
    });

    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const updateSubject = (i, updated) => {
    const subjects = [...semester.subjects];
    subjects[i] = updated;
    onUpdate({ ...semester, subjects });
  };

  const addSubject = () => {
    onUpdate({
      ...semester,
      subjects: [...semester.subjects, { name: "", credits: 0, grade: "" }]
    });
  };

const calcCredits = () => {
  return semester.subjects.reduce(
    (sum, s) => sum + (s.credits > 0 ? s.credits : 0),
    0
  );
};

  const getGpaClass = (gpa) => {
  if (gpa < 2) return "gpa-low";
  if (gpa < 3) return "gpa-mid";
  return "gpa-high";
  };

  return (
    <div className="semester">
      <div className="semester-header">
        <h2>{semester.name}</h2>

        <button
        className="remove-semester"
        onClick={onRemove}
        disabled={!canRemove}
        title="Remove semester">
        ✕
        </button>
      </div>
      <p className="gpa">
      Semester GPA:
        <strong className={getGpaClass(Number(calcGPA()))}>
        {" "}{calcGPA()}
        </strong>
        <span className="credits"> - <strong>{calcCredits()}</strong> credit hours</span>
      </p>

      {semester.subjects.map((s, i) => (
        <SubjectRow
          key={i}
          subject={s}
          onChange={(updated) => updateSubject(i, updated)}
          onDelete={() =>
            onUpdate({
              ...semester,
              subjects: semester.subjects.filter((_, idx) => idx !== i)
            })
          }
        />
      ))}

      <button className="add" onClick={addSubject}>+ Add Subject</button>
    </div>
  );
}
