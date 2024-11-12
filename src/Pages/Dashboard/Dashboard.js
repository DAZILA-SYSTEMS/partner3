import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import {
	Bank,
	CashCoin,
	Globe,
	Mailbox,
	People,
	PersonCircle,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Blogs from "../Blog/Blogs";
import Products from "../Display/Products";

const Dashboard = ({ FetchRates }) => {
	const navigate = useNavigate();

	const User = useSelector((state) => state.auth.user);

	const [Drawer, setDrawer] = useState(false);

	const ToggleDrawer = () => setDrawer(!Drawer);

	useEffect(() => {
		if (!User.token) {
			return navigate("/login");
		}
		FetchRates();
	}, []);

	return (
		<>
			<Header ToggleDrawer={ToggleDrawer}></Header>
			<div style={{ marginTop: "40px" }}>
				<div className="d-flex">
					<div
						className={`bg-secondary ${
							Drawer ? "side-menu-open" : "side-menu"
						}`}
					>
						<div>
							<p
								onClick={() => {
									setDrawer(false);
									navigate(`profile`);
								}}
							>
								<strong className="nav-link text-truncate text-capitalize">
									<PersonCircle /> {User.name || User.logger}
								</strong>
							</p>
							<hr />{" "}
							<p
								onClick={() => {
									setDrawer(false);
									navigate(`account`);
								}}
							>
								<strong className="nav-link">
									<CashCoin /> My Account
								</strong>
							</p>
							<hr />
							<p
								onClick={() => {
									setDrawer(false);
									navigate(`team`);
								}}
							>
								<strong className="nav-link">
									<People /> My Team
								</strong>
							</p>
							<hr />
							<p
								onClick={() => {
									setDrawer(false);
									navigate(`institutions`);
								}}
							>
								<strong className="nav-link">
									<Bank /> My Institutions
								</strong>
							</p>
							<hr />
							<p>
								{/*<span
									onClick={() => {
										navigate(`/${User.name}/terms`);
										ToggleDrawer();
									}}
									className="text-center text-info"
									style={{
										cursor: "pointer",
										fontSize: "12px",
									}}
								>
									<small>Terms And Conditions </small>
								</span>{" "}
								<br />
								<span
									onClick={() => {
										navigate(`/${User.name}/privacy`);
										ToggleDrawer();
									}}
									className="text-center text-info"
									style={{
										cursor: "pointer",
										fontSize: "12px",
									}}
								>
									<small>Privacy Policy </small>
								</span>{" "}
								<br />*/}
								<span
									className="text-center text-light"
									style={{
										cursor: "pointer",
										fontSize: "12px",
									}}
								>
									<small>
										<Globe /> www.techsystems.world
									</small>
								</span>
								<br />
								<span
									className="text-center text-light"
									style={{
										cursor: "pointer",
										fontSize: "12px",
									}}
								>
									<small>
										<Mailbox /> contact.techsystems@gmail.com
									</small>
								</span>
								<br />
								<span
									className="text-center text-light"
									style={{
										cursor: "pointer",
										fontSize: "12px",
									}}
								>
									<small>&copy; {new Date().getFullYear()} Techsystems</small>
								</span>
							</p>
						</div>
					</div>
					<div
						className={`${
							Drawer ? "main-page-drawer-open" : "main-page-drawer-closed"
						}`}
					>
						<div className="bg-light">
							<Outlet></Outlet>
							<Products></Products>
							<Blogs></Blogs>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
