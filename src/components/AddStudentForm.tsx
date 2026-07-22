import { useEffect, useState } from "react";
import type { Students } from "../pages/Home";
import { useNavigate } from "react-router-dom";

const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=20",
  "https://i.pravatar.cc/150?img=32",
];

interface StudentProp {
  onAdd: (student: Students) => void;
  editStudent: Students | null;
  onUpdate: (student: Students) => void;
}

const AddStudentForm = ({ onAdd, editStudent, onUpdate }: StudentProp) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]);

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setRole(editStudent.role);
      setAvatar(editStudent.avatar);
    }
  }, [editStudent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editStudent) {
      const response = await fetch(
        `http://0.0.0.0:3000/students/${editStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            role,
            avatar,
          }),
        },
      );
      const updatedStudent: Students = await response.json();

      onUpdate(updatedStudent);

      navigate("/");
    } else {
      const response = await fetch("http://0.0.0.0:3000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          role,
          avatar,
        }),
      });

      const addedStudent: Students = await response.json();

      onAdd(addedStudent);

      navigate("/");
    }
  };

  return (
    <div className="add-container">
      <h3>{editStudent ? "Edit Form" : "Add Form"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter your role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <fieldset className="avatar-picker">
          <legend>Choose an avatar</legend>

          {avatars.map((img) => (
            <label key={img} className="avatar-option">
              <input
                type="radio"
                name="avatar"
                value={img}
                checked={avatar === img}
                onChange={() => setAvatar(img)}
              />

              <img src={img} alt="Avatar" />
            </label>
          ))}
        </fieldset>

        <button type="submit">
          {editStudent ? "Update Student" : "Add Student"}
        </button>
        <button type="button" className="cancel" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
