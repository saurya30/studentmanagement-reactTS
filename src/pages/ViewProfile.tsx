import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Students } from "./Home"; 

const ViewProfile = () => {
  const { id } = useParams();

  const [student, setStudent] = useState<Students | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `http://0.0.0.0:3000/students/${id}`
        );

        if (!response.ok) {
          return;
        }

        const data: Students = await response.json();
        setStudent(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="profile-page">
    <div className="card profile-container">
      <img src={student.avatar} alt={student.name} />

      <h2>{student.name}</h2>

      <p>{student.role}</p>
    </div>
  </div>
);
};

export default ViewProfile;