import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Students } from "../pages/Home";

interface StudentState {
  students: Students[];
  editStudents: Students | null;
}

const initialState: StudentState = { students: [], editStudents: null };

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    handleStudents(state, action: PayloadAction<StudentState["students"]>) {
      state.students = action.payload;
    },

    addStudent(state, action: PayloadAction<Students>) {
      state.students.push(action.payload);
    },

    deleteStudent(state, action: PayloadAction<number>) {
      state.students = state.students.filter(
        (student) => student.id !== action.payload,
      );
    },

    updateStudent(state, action: PayloadAction<Students>) {
      state.students = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student,
      );
    },

    setEditingStudent(state, action: PayloadAction<Students | null>) {
      state.editStudents = action.payload;
    },
  },
});

export const {
  handleStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  setEditingStudent,
} = studentSlice.actions;
export default studentSlice.reducer;
