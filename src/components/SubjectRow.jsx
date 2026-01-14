export default function SubjectRow({ subject, onChange, onDelete }) {
  return (
    <div className="row">
      <input
        placeholder="Subject"
        value={subject.name}
        onChange={(e) => onChange({ ...subject, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Credits"
        min="0"
        value={subject.credits}
        onChange={(e) =>
          onChange({ ...subject, credits: Number(e.target.value) })
        }
      />

      <select
        value={subject.grade}
        onChange={(e) => onChange({ ...subject, grade: e.target.value })}
      >
        <option value="">Grade</option>
        {["A","A-","B+","B","B-","C+","C","D","F"].map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <button onClick={onDelete}>✕</button>
    </div>
  );
}
