import { useEffect } from "react";
import type { Students } from "../pages/Home";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { studentSchema, type StudentFormData } from "../schema/studentSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: { name: "", role: "", avatar: avatars[0] },
  });

  useEffect(() => {
    if (editStudent) {
      reset({
        name: editStudent.name,
        role: editStudent.role,
        avatar: editStudent.avatar,
      });
    }
  }, [editStudent, reset]);

  async function handleSubmission(data: StudentFormData) {
    if (editStudent) {
      const response = await fetch(
        `http://0.0.0.0:3000/students/${editStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
        body: JSON.stringify(data),
      });

      const addedStudent: Students = await response.json();

      onAdd(addedStudent);

      navigate("/");
    }
  }

  return (
    <div className="add-container">
      {" "}
      <h3>{editStudent ? "Edit Form" : "Add Form"}</h3>{" "}
      <form onSubmit={handleSubmit(handleSubmission)}>
        {" "}
        <TextField
          label="Name"
          size="small"
          fullWidth
          placeholder="Enter your name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />{" "}
        <TextField
          label="Role"
          size="small"
          fullWidth
          {...register("role")}
          error={!!errors.role}
          helperText={errors.role?.message}
        />{" "}
        <FormControl error={!!errors.avatar}>
          <FormLabel>Select an Avatar</FormLabel>

          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} row>
                {avatars.map((url) => (
                  <FormControlLabel
                    key={url}
                    value={url}
                    control={<Radio />}
                    label={
                      <img
                        src={url}
                        alt="Avatar option"
                        className="avatar-img"
                      />
                    }
                  />
                ))}
              </RadioGroup>
            )}
          />

          <FormHelperText>{errors.avatar?.message}</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" size="large">
          {editStudent ? "Update Student" : "Add Student"}
        </Button>
        <Button
          type="button"
          variant="contained"
          color="error"
          size="large"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </form>{" "}
    </div>
  );
};

export default AddStudentForm;
