import { createSlice } from "@reduxjs/toolkit";

export const AccountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
  },
  reducers: {
    fetchAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    addAccount: (state, action) => {
      state.accounts = [action.payload, ...state.accounts];
    },
  },
});

export const { fetchAccounts, addAccount } = AccountSlice.actions;

export default AccountSlice.reducer;
