import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
