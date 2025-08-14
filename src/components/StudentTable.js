import React from "react";
import NotesInput from "./NotesInput";

export default function StudentTable({ students, setStudents }) {
  const handleDelete = (id) => {
    if (window.confirm("Delete this student?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="table-wrap">
      <table>
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
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>
                {s.phone && <div>{s.phone}</div>}
                {s.email && <small>{s.email}</small>}
              </td>
              <td><span className={`pill ${s.status}`}>{s.status}</span></td>
              <td>{`${s.day || "-"} @ ${s.time || "-"}`}</td>
              <td><NotesInput student={s} setStudents={setStudents} /></td>
              <td>
                <button className="ghost">Edit</button>
                <button className="ghost" onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
