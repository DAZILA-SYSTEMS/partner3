import { createSlice } from "@reduxjs/toolkit";

export const HealthSlice = createSlice({
  name: "health",
  initialState: {
    healths: [],
  },
  reducers: {
    fetchHealths: (state, action) => {
      state.healths = action.payload;
    },
    addHealth: (state, action) => {
      state.healths = [action.payload, ...state.healths];
    },
  },
});

export const { fetchHealths, addHealth } = HealthSlice.actions;

export default HealthSlice.reducer;
