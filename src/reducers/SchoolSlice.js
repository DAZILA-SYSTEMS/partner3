import { createSlice } from "@reduxjs/toolkit";

export const SchoolSlice = createSlice({
  name: "school",
  initialState: {
    schools: [],
  },
  reducers: {
    fetchSchools: (state, action) => {
      state.schools = action.payload;
    },
    addSchool: (state, action) => {
      state.schools = [action.payload, ...state.schools];
    },
  },
});

export const { fetchSchools, addSchool } = SchoolSlice.actions;

export default SchoolSlice.reducer;
