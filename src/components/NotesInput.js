import React from "react";
import "../styles/Notes.css";

export default function NotesInput({ student, setStudents }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, notes: value } : s))
    );
  };

  return (
    <textarea
      className="notesInput"
      placeholder="Write notes here..."
      value={student.notes || ""}
      onChange={handleChange}
    />
  );
}
