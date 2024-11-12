import { createSlice } from "@reduxjs/toolkit";

export const PwaSlice = createSlice({
  name: "pwa",
  initialState: {
    promptInstall: null,
    supportsPWA: false,
  },
  reducers: {
    addPwa: (state, action) => {
      state.supportsPWA = true;
      state.promptInstall = action.payload;
    },
  },
});

export const { addPwa } = PwaSlice.actions;

export default PwaSlice.reducer;
