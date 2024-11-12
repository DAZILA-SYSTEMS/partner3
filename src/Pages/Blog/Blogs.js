import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import { PlainList } from "flatlist-react";
import BlogsCrud from "./BlogCrud";
import { FetchBlogs } from "../../Network/BlogApi";
import { useParams } from "react-router";

const Blogs = () => {
	useEffect(() => {
		FetchBlogs(User, Dispatch);
	}, []);
	const Params = useParams();
	const Dispatch = useDispatch();
	const User = useSelector((state) => state.auth.user);
	const BlogsData = useSelector((state) => state.blog.blogs)
		.filter((blog) => parseInt(blog.deleted) === 0)
		.sort((a, b) => b.linker - a.linker);
	const [BlogModal, setBlogModal] = useState(false);
	const [NewBlog, setNewBlog] = useState({
		title: "",
		blog: "",
		photo: "",
		password: "",
	});
	const [Type, setType] = useState("add");
	const [More, setMore] = useState(0);

	return (
		<div
			style={{
				backgroundColor: "rgba(255, 255, 255, 0.8)",
				borderRadius: "2%",
				minheight: "80vh",
				padding: "4px",
				marginTop: "4px",
			}}
		>
			{Params.access === "admin" ? (
				<div className="d-flex justify-content-center">
					<button
						className="btn btn-outline-primary"
						onClick={() => {
							setNewBlog({
								title: "",
								blog: "",
								photo: "",
								password: "",
							});
							setBlogModal(true);
							setType("add");
						}}
					>
						Post
					</button>
				</div>
			) : null}
			<div className="row justify-content-center">
				<PlainList
					list={BlogsData}
					renderOnScroll
					renderItem={(blog) => (
						<div className="col-md-6 col-lg-4 col-xl-3">
							<Blog
								blog={blog}
								setType={setType}
								setNewBlog={setNewBlog}
								setBlogModal={setBlogModal}
								More={More}
								setMore={setMore}
							></Blog>{" "}
						</div>
					)}
				/>
			</div>
			<BlogsCrud
				setShowModal={setBlogModal}
				ShowModal={BlogModal}
				blog={NewBlog}
				setBlog={setNewBlog}
				type={Type}
			></BlogsCrud>
		</div>
	);
};

export default Blogs;
