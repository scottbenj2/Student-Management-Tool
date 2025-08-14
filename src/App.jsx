import React, { useState, useEffect } from "react";

// Components
import Header from "./components/Header.jsx";
import StudentForm from "./components/StudentForm.jsx";
import StudentTable from "./components/StudentTable.jsx";
import Calendar from "./components/Calendar.jsx";

// Utilities
import { loadStudents, saveStudents } from "./utils/localStorage";

// Data
import initialData from "./data.js";

// Styles
import "./styles/App.css";

function App() {
  const [students, setStudents] = useState([]);

  // Load students from localStorage or initial data
  useEffect(() => {
    const data = loadStudents();
    if (!data || data.length === 0) {
      setStudents(initialData);
      saveStudents(initialData);
    } else {
      setStudents(data);
    }
  }, []);

  // Save students to localStorage whenever it changes
  useEffect(() => {
    saveStudents(students);
  }, [students]);

  return (
    <div className="wrap">
      <Header />
      <StudentForm students={students} setStudents={setStudents} />
      <StudentTable students={students} setStudents={setStudents} />
      <Calendar students={students} />
    </div>
  );
}

export default App;
