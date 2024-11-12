import { createSlice } from "@reduxjs/toolkit";

export const BlogSlice = createSlice({
	name: "blog",
	initialState: {
		blogs: [],
	},
	reducers: {
		fetchBlogs: (state, action) => {
			state.blogs = action.payload;
		},
		updateBlog: (state, action) => {
			let index = state.blogs.findIndex(
				(blog) => parseInt(blog.id) === parseInt(action.payload.id)
			);

			let prevBlogs = [...state.blogs];

			prevBlogs.splice(
				index < 0 ? 0 : index,
				index < 0 ? 0 : 1,
				action.payload
			);

			state.blogs = prevBlogs;
		},
	},
});

export const { updateBlog, fetchBlogs } = BlogSlice.actions;

export default BlogSlice.reducer;
