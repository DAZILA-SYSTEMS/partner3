import swal from "sweetalert";
import { addAccount, fetchAccounts } from "../reducers/AccountSlice";
import { ApiUrl } from "./Urls";

export const FetchExchange = () => {
	return fetch(`${ApiUrl}/account/exchange`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({}),
	})
		.then((res) => res.json())
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return { status: "error" };
		});
};

export const FetchAccounts = (User, dispatch) => {
	return fetch(`${ApiUrl}/account/get`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `bearer ${User.token}`,
		},
		body: JSON.stringify({}),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.status === 200) {
				dispatch(fetchAccounts(res.data));
			}
		})
		.catch((err) => {
			return { status: "error" };
		});
};

export const AddAccount = (User, data, dispatch) => {
	return fetch(`${ApiUrl}/account/withdraw`, {
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
				dispatch(addAccount(res.data));
			} else {
				swal({
					title: "Sever Error!!",
					text: "Try again",
					icon: "warning",
					timer: 3000,
				});
			}
		})
		.catch((err) => {
			swal({
				title: "Network Error!!",
				text: "Try again",
				icon: "warning",
				timer: 3000,
			});
		});
};
