import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);

  const apiUrl = process.env.API_BASE_URL; // Sử dụng biến môi trường

  const getStudents = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/students`); // Sử dụng URL API từ biến môi trường
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const editStudent = (student) => {
    setCurrentStudent(student);
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/students/${id}`); // Sử dụng URL API từ biến môi trường
      getStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  return (
    <div className="container">
      <header>
        <h1>Student Management System</h1>
      </header>
      <StudentForm
        getStudents={getStudents}
        currentStudent={currentStudent}
        setCurrentStudent={setCurrentStudent}
      />
      <StudentList
        students={students}
        editStudent={editStudent}
        deleteStudent={deleteStudent}
      />
    </div>
  );
};

export default App;
