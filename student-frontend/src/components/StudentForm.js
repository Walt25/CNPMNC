import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Student.css";

const StudentForm = ({ getStudents, currentStudent, setCurrentStudent }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [major, setMajor] = useState("");

  useEffect(() => {
    if (currentStudent) {
      setName(currentStudent.name);
      setAge(currentStudent.age);
      setMajor(currentStudent.major);
    }
  }, [currentStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStudent) {
      await axios.put(
        `http://localhost:5000/api/students/${currentStudent._id}`,
        { name, age, major }
      );
      setCurrentStudent(null);
    } else {
      await axios.post("http://localhost:5000/api/students", {
        name,
        age,
        major,
      });
    }
    setName("");
    setAge("");
    setMajor("");
    getStudents();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Major</label>
        <input
          type="text"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          required
        />
      </div>
      <button type="submit">{currentStudent ? "Update" : "Add"} Student</button>
    </form>
  );
};

export default StudentForm;
