import swal from "sweetalert";
import { addFinance, fetchFinances } from "../reducers/FinanceSlice";
import { addHealth, fetchHealths } from "../reducers/HealthSlice";
import { addRental, fetchRentals } from "../reducers/RentalSlice";
import { addSchool, fetchSchools } from "../reducers/SchoolSlice";
import { ApiUrl } from "./Urls";
import { addBusiness, fetchBusinesss } from "../reducers/BusinessSlice";

export const FetchInsts = (User, data, dispatch) => {
	return fetch(`${ApiUrl}/inst/get`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `bearer ${User.token}`,
		},
		body: JSON.stringify({
			...data,
		}),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.status === 200) {
				if (data.type === "school") {
					dispatch(fetchSchools([...res.data]));
					return;
				}
				if (data.type === "finance") {
					dispatch(fetchFinances([...res.data]));
					return;
				}
				if (data.type === "health") {
					dispatch(fetchHealths([...res.data]));
					return;
				}
				if (data.type === "rental") {
					dispatch(fetchRentals([...res.data]));
					return;
				}
				if (data.type === "business") {
					dispatch(fetchBusinesss([...res.data]));
					return;
				}
			}
		})
		.catch((err) => {
			return { status: "error" };
		});
};

export const AddInst = (User, data, dispatch) => {
	return fetch(`${ApiUrl}/inst/add`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `bearer ${User.token}`,
		},
		body: JSON.stringify({
			...data,
		}),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.status === 201) {
				if (data.type === "school") {
					dispatch(addSchool(res.data));
					return;
				}
				if (data.type === "finance") {
					dispatch(addFinance(res.data));
					return;
				}
				if (data.type === "health") {
					dispatch(addHealth(res.data));
					return;
				}
				if (data.type === "rental") {
					dispatch(addRental(res.data));
					return;
				}
				if (data.type === "business") {
					dispatch(addBusiness(res.data));
					return;
				}
			} else {
				swal({
					title: "Server Error",
					text: "Try again",
					icon: "warning",
					timer: 3000,
				});
			}
		})
		.catch(() => {
			swal({
				title: "Network Error",
				text: "Try again",
				icon: "warning",
				timer: 3000,
			});
		});
};
