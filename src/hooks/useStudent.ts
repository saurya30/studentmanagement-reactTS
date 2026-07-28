import { useEffect } from "react";
import type { Students } from "../pages/Home";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  handleStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  setEditingStudent,
} from "../store/studentSlice";

const useStudent = () => {
  // const [students, setStudents] = useState<Students[]>([]);
  // const [editStudent, setEditStudent] = useState<Students | null>(null);

  const dispatch = useDispatch();
  const students = useSelector((state: RootState) => state.student.students);
  const editingStudent = useSelector(
    (state: RootState) => state.student.editStudents,
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://0.0.0.0:3000/students");
        console.log(response);

        if (!response.ok) return;

        const data: Students[] = await response.json();
        console.log(data);

        dispatch(handleStudents(data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    dispatch(deleteStudent(id));
  };

  const handleAdd = (student: Students) => {
    dispatch(addStudent(student));
  };

  const handleEdit = (student: Students) => {
    dispatch(setEditingStudent(student));
  };

  const handleUpdate = (updatedStudent: Students) => {
    dispatch(updateStudent(updatedStudent));

    dispatch(setEditingStudent(null));
  };

  return {
    handleDelete,
    handleAdd,
    handleEdit,
    handleUpdate,
    students,
    editingStudent,
  };
};

export default useStudent;
