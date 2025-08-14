import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import Calendar from "./components/Calendar";
import { loadStudents, saveStudents } from "./utils/localStorage";
import initialData from "./data";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const data = loadStudents();
    if (data.length === 0) {
      setStudents(initialData);
      saveStudents(initialData);
    } else {
      setStudents(data);
    }
  }, []);

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
