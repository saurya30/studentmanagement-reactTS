
import StudentCard from "./StudentCard"
import AddStudentForm from "./AddStudentForm";
import useStudent from "../hooks/useStudent";

export interface Students {
    id:number;
    name:string;
    role:string;
    avatar:string;
  }

const Card = () => {
  
  const {handleAdd, handleDelete, handleEdit, handleUpdate, students, editStudent} = useStudent();
  
  return (
    <>
    <AddStudentForm 
    onAdd={handleAdd} 
    editStudent={editStudent} 
    onUpdate={handleUpdate}
    />
    <div className="container">
      <h3>Students List</h3>
        <div className="card-layout">
        {students.map((student) => (
          <StudentCard 
          key={student.id} 
          name={student.name} 
          role={student.role} 
          avatar={student.avatar} 
          id={student.id}
          onDelete={handleDelete}
          onEdit={handleEdit}
          />
        ))}
    </div>
    </div>
    </>
  )
}

export default Card
