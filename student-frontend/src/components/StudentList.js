import React from "react";
import "./Student.css";

const StudentList = ({ students, editStudent, deleteStudent }) => {
  return (
    <div className="student-list">
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.age} - {student.major}
            <button onClick={() => editStudent(student)}>Edit</button>
            <button onClick={() => deleteStudent(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
