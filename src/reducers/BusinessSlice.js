import { createSlice } from "@reduxjs/toolkit";

export const BusinessSlice = createSlice({
	name: "business",
	initialState: {
		businesss: [],
	},
	reducers: {
		fetchBusinesss: (state, action) => {
			state.businesss = action.payload;
		},
		addBusiness: (state, action) => {
			state.businesss = [action.payload, ...state.businesss];
		},
	},
});

export const { fetchBusinesss, addBusiness } = BusinessSlice.actions;

export default BusinessSlice.reducer;
