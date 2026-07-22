
import { Link } from "react-router-dom";
import StudentCard from "../components/StudentCard"
import useStudent from "../hooks/useStudent";

export interface Students {
    id:number;
    name:string;
    role:string;
    avatar:string;
  }

const Home = () => {
  
  const { handleDelete, handleEdit, students} = useStudent();
  
  return (

    <div className="container">
      <h3>Students List</h3>
              {
          students.length > 0 ? 
          <div className="card-layout">
        {students.map((student: Students) => (
          <StudentCard 
          key={student.id} 
          name={student.name} 
          role={student.role} 
          avatar={student.avatar} 
          id={student.id}
          onDelete={handleDelete}
          onEdit={handleEdit}
          />
        )) }
    </div>
    :
    <div className="empty-container">
      <h3 className="empty-std">
      No Students Found Please Go to
       <Link to="/add-student"> Add Student</Link>
       </h3> 
    </div>
    }

    </div>
  )
}

export default Home
