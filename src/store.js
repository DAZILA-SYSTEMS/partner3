import { configureStore } from "@reduxjs/toolkit";
import { LoadState, SaveState } from "./Utils/LocalStorage";
import AuthSlice from "./reducers/AuthSlice";
import PwaSlice from "./reducers/PwaSlice";
import TeamSlice from "./reducers/TeamSlice";
import AccountSlice from "./reducers/AccountSlice";
import SchoolSlice from "./reducers/SchoolSlice";
import RentalSlice from "./reducers/RentalSlice";
import HealthSlice from "./reducers/HealthSlice";
import FinanceSlice from "./reducers/FinanceSlice";
import BusinessSlice from "./reducers/BusinessSlice";
import BlogSlice from "./reducers/BlogSlice";

const persistedState = LoadState();

const store = configureStore({
	reducer: {
		auth: AuthSlice,
		pwa: PwaSlice,
		team: TeamSlice,
		account: AccountSlice,
		school: SchoolSlice,
		rental: RentalSlice,
		health: HealthSlice,
		finance: FinanceSlice,
		business: BusinessSlice,
		blog: BlogSlice,
	},
	preloadedState: persistedState,
});

store.subscribe(() => {
	SaveState(store.getState());
});

export default store;
