import React, { useState } from "react";
import { exportCSV, importCSV } from "../utils/csv";

export default function StudentForm({ students, setStudents }) {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    phone: "",
    email: "",
    status: "explore",
    day: "Monday",
    time: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      phone: "",
      email: "",
      status: "explore",
      day: "Monday",
      time: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a name");
      return;
    }

    if (formData.id) {
      setStudents((prev) =>
        prev.map((s) => (s.id === formData.id ? { ...formData } : s))
      );
    } else {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      setStudents((prev) => [...prev, { ...formData, id }]);
    }
    resetForm();
  };

  const handleEdit = (student) => {
    setFormData(student);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExport = () => {
    const csv = exportCSV(students);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "csl_students_export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const importedRows = importCSV(text);
    const merged = [...students];
    importedRows.forEach((row) => {
      if (!row.id) {
        row.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      }
      const existingIndex = merged.findIndex((s) => s.id === row.id);
      if (existingIndex >= 0) {
        merged[existingIndex] = { ...merged[existingIndex], ...row };
      } else {
        merged.push(row);
      }
    });
    setStudents(merged);
    alert(`Imported ${importedRows.length} rows`);
    e.target.value = "";
  };

  const handleResetAll = () => {
    if (window.confirm("This will delete ALL saved students. Continue?")) {
      setStudents([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card" id="addForm">
      {/* Name */}
      <div>
        <label htmlFor="name">Student name</label>
        <input
          id="name"
          type="text"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          placeholder="e.g. +64 21 555 555"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="student@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status">Study stage</label>
        <select id="status" value={formData.status} onChange={handleChange}>
          <option value="explore">Explore</option>
          <option value="follow">Follow up</option>
          <option value="reach">Reach</option>
          <option value="grow">Grow</option>
        </select>
      </div>

      {/* Day */}
      <div>
        <label htmlFor="day">Meet day</label>
        <select id="day" value={formData.day} onChange={handleChange}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </div>

      {/* Time */}
      <div>
        <label htmlFor="time">Meet time</label>
        <select id="time" value={formData.time} onChange={handleChange}>
          <option value="">--</option>
          <option value="8am">8am</option>
          <option value="9am">9am</option>
          <option value="10am">10am</option>
          <option value="11am">11am</option>
          <option value="12pm">12pm</option>
          <option value="1pm">1pm</option>
          <option value="2pm">2pm</option>
          <option value="3pm">3pm</option>
          <option value="4pm">4pm</option>
          <option value="5pm">5pm</option>
        </select>
      </div>

      {/* Actions */}
      <div className="full actions">
        <button type="submit">
          {formData.id ? "Save changes" : "Add student"}
        </button>
        <button type="button" className="ghost" onClick={resetForm}>
          Clear form
        </button>
        <div className="right">
          <input
            type="file"
            accept=".csv,text/csv"
            style={{ display: "none" }}
            id="fileImport"
            onChange={handleImport}
          />
          <button
            type="button"
            className="ghost"
            onClick={() => document.getElementById("fileImport").click()}
          >
            Import CSV
          </button>
          <button type="button" className="ghost" onClick={handleExport}>
            Export CSV
          </button>
          <button type="button" className="ghost" onClick={handleResetAll}>
            Reset all
          </button>
        </div>
      </div>
    </form>
  );
}
