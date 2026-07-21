
import type { Students } from "./Card";

 interface StudentProps extends Students{
    onDelete: (id:number) => void;
    onEdit: (student: Students) => void;
  }

const StudentCard = ({name, role, avatar, id, onDelete, onEdit}: StudentProps) => {

  const handleDelete = async () => {
    try {

      const response = await fetch(`http://0.0.0.0:3000/students/${id}`,
      {
        method: "DELETE",
      }
    );

    if(!response.ok) {
      console.log("FAILED TO DELETE");
      
    }
    onDelete(id);

    } catch (error) {
      console.log(error);
      
    }
  }

  return (
  
      <div className="card">
        <img src={avatar}alt="Avatar" />
      <div className="info">
        <h2>{name}</h2>
        <p>{role}</p>
      </div>
      <div className="btn">
        <button className="btn-edit" onClick={() => onEdit({
          id, name, role, avatar
        })} >Edit</button>
        <button className="btn-delete" onClick={handleDelete}>Delete</button>
      </div>
      </div>
    

  )
}

export default StudentCard
