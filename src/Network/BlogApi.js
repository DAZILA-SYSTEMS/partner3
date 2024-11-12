import swal from "sweetalert";
import { ApiUrl } from "./Urls";
import { fetchBlogs, updateBlog } from "../reducers/BlogSlice";

export const AddBlog = (blog, User, dispatch) => {
	return fetch(`${ApiUrl}/blog/add`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `bearer ${User.token}`,
		},
		body: JSON.stringify({
			...blog,
		}),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.status === 200) {
				dispatch(updateBlog({ ...res.data, user: User }));
				swal({
					title: `Blog Up`,
					text: "Added Successfully",
					icon: "success",
					timer: 3000,
				});
				return res.data;
			} else if (res.status === 400) {
				swal({
					title: `${
						res.message === "deleted"
							? "Blog Recentaly deleted"
							: "Blog already added"
					}!!!`,
					text: `${
						res.message === "deleted"
							? "Wait one month to add  again"
							: "Can not add blog twice"
					}!!!`,
					icon: "warning",
					timer: 3000,
				});
			} else {
				swal({
					title: `Server Error!!!`,
					text: "Try again.",
					icon: "warning",
					timer: 3000,
				});
				return 0;
			}
		})
		.catch((err) => {
			swal({
				title: `Network  Error!!!`,
				text: "Try again.",
				icon: "warning",
				timer: 3000,
			});
			return 0;
		});
};

export const UpdateBlog = (blog, User, dispatch) => {
	return fetch(`${ApiUrl}/blog/update`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `bearer ${User.token}`,
		},
		body: JSON.stringify({
			...blog,
		}),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.status === 200) {
				dispatch(updateBlog({ ...res.data, user: User }));
				swal({
					title: `Blog Up`,
					text: "Updated Successfully",
					icon: "success",
					timer: 3000,
				});
				return res.data;
			} else {
				swal({
					title: `Server Error!!!`,
					text: "Try again.",
					icon: "warning",
					timer: 3000,
				});
				return 0;
			}
		})
		.catch((err) => {
			swal({
				title: `Network  Error!!!`,
				text: "Try again.",
				icon: "warning",
				timer: 3000,
			});
			return 0;
		});
};

export const FetchBlogs = (User, dispatch) => {
	return fetch(`${ApiUrl}/blog/get`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `bearer ${User.token}`,
		},
		body: JSON.stringify({
			country: User.country,
		}),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.status === 200) {
				dispatch(fetchBlogs(res.data));

				return res.data;
			} else {
				swal({
					title: `Server Error!!!`,
					text: "Try again.",
					icon: "warning",
					timer: 3000,
				});
				return 0;
			}
		})
		.catch((err) => {
			console.log(err);
			swal({
				title: `Network  Error!!!`,
				text: "Try again.",
				icon: "warning",
				timer: 3000,
			});
			return 0;
		});
};
