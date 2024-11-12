import React from "react";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { ApiUrl } from "../../Network/Urls";
import { Dropdown } from "react-bootstrap";
import { useParams } from "react-router";

const Blog = ({
	blog,

	setType,
	setBlogModal,
	setNewBlog,
	More,
	setMore,
}) => {
	const Params = useParams();
	const TrimText = (text, length) => {
		if (text.length <= length) {
			return text;
		}
		return text.substr(0, length);
	};

	return (
		<>
			<div className="card">
				<div className="card-header">
					<div className="d-flex">
						<p className="card-title h6">{blog.title}</p>
						{Params.access === "admin" ? (
							<Dropdown>
								<Dropdown.Toggle variant="transparent" className="nav-link">
									<span className="text-success">...</span>
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => {
											setType("edit");
											setNewBlog(blog);
											setBlogModal(true);
										}}
									>
										<span className="btn-link text-primary">
											<PencilSquare /> Edit
										</span>
									</Dropdown.Item>{" "}
									<Dropdown.Item
										onClick={() => {
											setType("delete");
											setNewBlog(blog);
											setBlogModal(true);
										}}
									>
										<span className="btn-link text-danger">
											<Trash /> Delete
										</span>
									</Dropdown.Item>{" "}
								</Dropdown.Menu>
							</Dropdown>
						) : null}{" "}
					</div>
				</div>
				<img
					className="card-img-top"
					alt={`${blog.photo}`}
					src={`${ApiUrl}/uploads/${blog.photo}`}
				/>
				<div className="card-body">
					{More === blog.id ? (
						<p style={{ whiteSpace: "pre-line" }}>{blog.blog}</p>
					) : (
						<p style={{ whiteSpace: "pre-line" }}>
							{TrimText(blog.blog, 50)}{" "}
							{blog.blog.length > 50 ? (
								<span
									className="btn-link text-primary"
									style={{ cursor: "pointer" }}
									onClick={() => setMore(blog.id)}
								>
									...more
								</span>
							) : (
								""
							)}
						</p>
					)}
				</div>
			</div>
			<hr />
		</>
	);
};

export default Blog;
