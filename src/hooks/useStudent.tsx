import { useEffect, useState } from "react";
import type { Students } from "../pages/Home";

const useStudent = () => {
    const [students, setStudents] = useState<Students[]>([]);
  const [editStudent, setEditStudent] = useState<Students | null>(null);

  useEffect(() => {
    (async() => {
      try {
        const response = await fetch("http://0.0.0.0:3000/students");
        console.log(response);

        if(!response.ok) return;

        const data: Students[] = await response.json();
        console.log(data);
        
        setStudents(data);
        
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  const handleDelete = async (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id))
  }

  const handleAdd = (student: Students) => {
    setStudents((prev) => [...prev, student])
  }

  const handleEdit = (student: Students) => {
  setEditStudent(student);
};

const handleUpdate = (updatedStudent: Students) => {
  setStudents((prev) =>
    prev.map((student) =>
      student.id === updatedStudent.id
        ? updatedStudent
        : student
    )
  );

  setEditStudent(null);
};

return {handleDelete, handleAdd, handleEdit, handleUpdate, students, editStudent}
}

export default useStudent
