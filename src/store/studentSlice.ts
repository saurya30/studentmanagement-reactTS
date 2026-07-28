import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Students } from "../pages/Home";

interface StudentState {
  students: Students[];
}

const initialState: StudentState = { students: [] };

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    handleStudents(state, action: PayloadAction<StudentState["students"]>) {
      state.students = action.payload;
    },
  },
});

export const { handleStudents } = studentSlice.actions;
export default studentSlice.reducer;
