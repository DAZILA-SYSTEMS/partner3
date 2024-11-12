import { createSlice } from "@reduxjs/toolkit";

export const TeamSlice = createSlice({
  name: "team",
  initialState: {
    team: [],
  },
  reducers: {
    fetchTeams: (state, action) => {
      state.team = action.payload;
    },
  },
});

export const { fetchTeams } = TeamSlice.actions;

export default TeamSlice.reducer;
