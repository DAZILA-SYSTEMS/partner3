import React from "react";
import { useSelector } from "react-redux";
import logo from "../assets/images/tech-systems-agent-logo.jpg";
import {
	ArrowThroughHeart,
	Person,
	PersonBadge,
	PersonHearts,
	MenuButton,
} from "react-bootstrap-icons";
import { Dropdown } from "react-bootstrap";
import PwaInstall from "../Utils/PwaInstall";
import { useNavigate } from "react-router-dom";

const Header = ({ setShowModal, setAuth, setAuthData, ToggleDrawer }) => {
	const navigate = useNavigate();
	const User = useSelector((state) => state.auth.user);

	return (
		<div className="bg-secondary header " style={{ color: "white" }}>
			{" "}
			{ToggleDrawer ? (
				<div className="d-flex justify-content-between">
					<button className="navbar-toggler">
						<MenuButton
							className="navbar-toggler-icon"
							onClick={() => ToggleDrawer()}
						></MenuButton>
					</button>
					<p className="navbar-brand h5">Techsystem Agent</p>
					<div className="d-flex justify-content-between">
						<PwaInstall></PwaInstall>{" "}
						<img
							src={logo}
							alt="techsystem-agent-logo"
							className="rounded"
							style={{ maxHeight: "40px", width: "auto" }}
						/>
					</div>
				</div>
			) : (
				<div className=" d-flex justify-content-between">
					<div
						className="d-flex align-items-center"
						onClick={() => navigate("/")}
						style={{ cursor: "pointer" }}
					>
						{" "}
						<img
							src={logo}
							alt="techsystem-agent-logo"
							className="rounded "
							style={{ maxHeight: "40px", width: "auto" }}
						/>
						<p className="navbar-brand h5 mx-2">Techsystems Partner </p>
					</div>

					<div className="d-flex">
						{!User.token ? (
							<Dropdown>
								<Dropdown.Toggle
									variant="transparent"
									className="nav-link pt-2 rounded-pill text-decoration-underline"
								>
									<Person /> Sign In
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => {
											setAuth("Register");
											setAuthData({});
											setShowModal(true);
										}}
									>
										<span className="btn-link text-primary">Register</span>
									</Dropdown.Item>{" "}
									<Dropdown.Item
										onClick={() => {
											setAuth("Login");
											setAuthData({});
											setShowModal(true);
										}}
									>
										<span className="btn-link text-primary">Login</span>
									</Dropdown.Item>{" "}
								</Dropdown.Menu>
							</Dropdown>
						) : null}
						<PwaInstall></PwaInstall>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
