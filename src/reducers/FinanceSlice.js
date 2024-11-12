import { createSlice } from "@reduxjs/toolkit";

export const FinanceSlice = createSlice({
  name: "finance",
  initialState: {
    finances: [],
  },
  reducers: {
    fetchFinances: (state, action) => {
      state.finances = action.payload;
    },
    addFinance: (state, action) => {
      state.finances = [action.payload, ...state.finances];
    },
  },
});

export const { fetchFinances, addFinance } = FinanceSlice.actions;

export default FinanceSlice.reducer;
