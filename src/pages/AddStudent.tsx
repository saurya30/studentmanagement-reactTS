import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddStudentForm from "../components/AddStudentForm";
import useStudent from "../hooks/useStudent";
import type { Students } from "./Home";

const AddStudent = () => {
  const { handleAdd, handleUpdate } = useStudent();
const { id } = useParams();

const [editStudent, setEditStudent] = useState<Students | null>(null);

useEffect(() => {
  if (!id) return;

  const fetchStudent = async () => {
    try {
      const response = await fetch(
        `http://0.0.0.0:3000/students/${id}`
      );

      if (!response.ok) {
        return;
      }

      const data: Students = await response.json();
      setEditStudent(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchStudent();
}, [id]);

  return (
    <main className="page">
      <AddStudentForm 
    onAdd={handleAdd} 
    editStudent={editStudent} 
    onUpdate={handleUpdate}
    />
    </main>
  )
}

export default AddStudent
