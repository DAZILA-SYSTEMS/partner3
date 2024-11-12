import { createSlice } from "@reduxjs/toolkit";

export const RentalSlice = createSlice({
  name: "rental",
  initialState: {
    rentals: [],
  },
  reducers: {
    fetchRentals: (state, action) => {
      state.rentals = action.payload;
    },
    addRental: (state, action) => {
      state.rentals = [action.payload, ...state.rentals];
    },
  },
});

export const { fetchRentals, addRental } = RentalSlice.actions;

export default RentalSlice.reducer;
