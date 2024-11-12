import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddBlog, UpdateBlog } from "../../Network/BlogApi";
import { FilePlus } from "react-bootstrap-icons";
import { ApiUrl } from "../../Network/Urls";

const BlogsCrud = (props) => {
	//redux dispatch
	const dispatch = useDispatch();

	const User = useSelector((state) => state.auth.user);

	const [Loading, setLoading] = useState(false);

	//update blog
	const EditBlog = async () => {
		await UpdateBlog(
			{
				...props.blog,
				number: props.blog.phone,
				trace: Date.now(),
				deleted: props.type === "delete" ? 1 : 0,
			},
			User,
			dispatch
		);
	};

	const SaveBlog = async () => {
		let trace = Date.now();

		await AddBlog(
			{
				...props.blog,
				live: 1,
				status: 0,
				trace,
				deleted: 0,
			},
			User,
			dispatch
		);
	};

	const ConvertImage = () => {
		const fileInput = document.getElementById("fileInput");
		const file = fileInput.files[0];

		const reader = new FileReader();
		reader.onload = function (e) {
			const base64Data = e.target.result;

			let image = new Image();
			image.src = base64Data;

			image.onload = () => {
				let canvas = document.createElement("canvas");
				let ctx = canvas.getContext("2d");
				let MAX_SIZE = 200 * 1024;
				let width = image.width;
				let height = image.height;
				let ratio = 1;

				if (file.size > MAX_SIZE) {
					ratio = Math.sqrt(MAX_SIZE / file.size);
					width *= ratio;
					height *= ratio;
				}
				canvas.width = width;
				canvas.height = height;

				ctx.drawImage(image, 0, 0, width, height);

				let MinBase64 = canvas.toDataURL("image/jpeg", 0.7);
				props.setBlog({
					...props.blog,
					photo: MinBase64,
				});
			};
		};
		reader.readAsDataURL(file);
	};

	const HandleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (props.type === "add") {
			await SaveBlog();
		} else {
			await EditBlog();
		}
		setLoading(false);
		props.setShowModal(false);
	};

	return (
		<Modal
			show={props.ShowModal}
			onHide={() => props.setShowModal(false)}
			backdrop="static"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>
					<p className="text-capitalize text-center">
						{props.type === "add"
							? "Get Bloged To Your SoulMate"
							: `${props.type} Blog`}
					</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={HandleSubmit}>
					<div
						className="form-group"
						onClick={() => document.getElementById("fileInput").click()}
					>
						<label className="mb-2 text-capitalize">
							{" "}
							Your Photo: <FilePlus className="h1 text-bg-secondary" />
						</label>

						<input
							type="file"
							id="fileInput"
							style={{ display: "none" }}
							accept="image/*"
							onChange={() => ConvertImage()}
						/>
						{props.blog.photo !== "" ? (
							<>
								<br />{" "}
								<img
									src={
										props.blog.photo.length > 500
											? `${props.blog.photo}`
											: `${ApiUrl}/uploads/${props.blog.photo}`
									}
									className="img-fluid img-thumbnail"
								/>
							</>
						) : null}

						<hr />
					</div>
					<div className="form-group">
						<label className="mb-2 text-capitalize">Blog Title</label>
						<input
							className="rounded-pill form-control"
							placeholder={`blog title...`}
							value={props.blog.title}
							onChange={(e) =>
								props.setBlog({
									...props.blog,
									title: e.target.value,
								})
							}
							required
							readOnly={props.type === "delete" ? true : false}
						/>
						<hr />
					</div>
					<div className="form-group">
						<label className="mb-2 text-capitalize">Blog Body</label>
						<textarea
							className="rounded-pill form-control"
							placeholder={`type blog...`}
							value={props.blog.blog}
							onChange={(e) =>
								props.setBlog({
									...props.blog,
									blog: e.target.value,
								})
							}
							required
							readOnly={props.type === "delete" ? true : false}
						/>
						<hr />
					</div>
					<div className="form-group">
						<label className="mb-2 text-capitalize">Blog Password</label>
						<input
							className="rounded-pill form-control"
							placeholder={`blog password...`}
							value={props.blog.password}
							onChange={(e) =>
								props.setBlog({
									...props.blog,
									password: e.target.value,
								})
							}
							required
							readOnly={props.type === "delete" ? true : false}
							type="password"
						/>
						<hr />
					</div>
					<div className="d-flex justify-content-around mb-2">
						{Loading ? (
							<span className="spinner-border text-primary"></span>
						) : props.type === "delete" ? (
							<>
								<Button variant="danger" type="submit">
									Delete
								</Button>{" "}
								<Button
									variant="secondary"
									type="button"
									onClick={() => props.setShowModal(false)}
								>
									Cancel
								</Button>
							</>
						) : (
							<Button variant="primary" type="submit">
								Save
							</Button>
						)}
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default BlogsCrud;
