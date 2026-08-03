import { useNavigate } from "react-router-dom";
import type { Students } from "../pages/Home";

interface StudentProps extends Students {
  onDelete: (id: number) => void;
  onEdit: (student: Students) => void;
}

const StudentCard = ({ name, role, avatar, id, onDelete }: StudentProps) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://0.0.0.0:3000/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log("FAILED TO DELETE");
      }
      onDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card" onClick={() => navigate(`/student/${id}`)}>
      <img src={avatar} alt="Avatar" />
      <div className="info">
        <h2>{name}</h2>
        <p>{role}</p>
      </div>
      <div className="btn">
        <button
          className="btn-edit"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit-student/${id}`);
          }}
        >
          Edit
        </button>
        <button
          className="btn-delete"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
