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
  // React state: holds the current list of students
  // setStudents updates the list
  const [students, setStudents] = useState([]);

  // React state: holds the current form data
  // setFormData updates the form fields
  const [formData, setFormData] = useState(initialFormData);

  // Called when the user clicks "Edit" on a student in StudentTable
  const handleEdit = (student) => {
    setFormData(student); // Load the selected student's data into the form
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top where the form is
  };

  // Load students from localStorage on first render
  useEffect(() => {
    const data = loadStudents(); // Try to get saved students
    if (!data || data.length === 0) {
      // If nothing saved, use initialData and store it
      setStudents(initialData);
      saveStudents(initialData);
    } else {
      // If saved data exists, load it into state
      setStudents(data);
    }
  }, []); // Empty dependency array → runs once on mount

  // Save students to localStorage whenever the list changes
  useEffect(() => {
    saveStudents(students);
  }, [students]); // Runs every time 'students' changes

  return (
    <div className="wrap">
      <Header />

      {/* Pass students, setStudents, and form state to the form */}
      <StudentForm
        students={students}
        setStudents={setStudents}
        formData={formData}
        setFormData={setFormData}
      />

      {/* Pass students, setStudents, and handleEdit to the table */}
      <StudentTable
        students={students}
        setStudents={setStudents}
        onEdit={handleEdit} // So clicking "Edit" loads the student into the form
      />

      <Calendar students={students} />
    </div>
  );
}

export default App;
