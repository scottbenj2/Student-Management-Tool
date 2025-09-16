import React from "react";
import NotesInput from "./NotesInput";

/**
 * StudentTable: displays a list of students in a table.
 * Props:
 *   students: array of student objects
 *   setStudents: function to update the student list
 *   onEdit: function called when Edit button is clicked
 */
export default function StudentTable({ students, setStudents, onEdit }) {
  // Delete student by id (with confirmation)
  const handleDelete = (id) => {
    if (window.confirm("Delete this student?")) {
      // Remove the student with the matching id
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="table-wrap">
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Weekly meetup</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table body: render one row per student */}
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              {/* Name */}
              <td>{s.name}</td>

              {/* Contact info: phone and email if available */}
              <td>
                {s.phone && <div>{s.phone}</div>}
                {s.email && <small>{s.email}</small>}
              </td>

              {/* Status: styled as colored pill */}
              <td>
                <span className={`pill ${s.status}`}>{s.status}</span>
              </td>

              {/* Weekly meetup: show "day @ time" with "-" fallback */}
              <td>{`${s.day || "-"} @ ${s.time || "-"}`}</td>

              {/* Notes column: uses NotesInput component */}
              <td>
                <NotesInput student={s} setStudents={setStudents} />
              </td>

              {/* Actions: Edit calls onEdit, Delete removes student */}
              <td>
                <button className="ghost" onClick={() => onEdit(s)}>
                  Edit
                </button>
                <button
                  className="ghost"
                  onClick={() => handleDelete(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
