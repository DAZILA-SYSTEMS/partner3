import React from "react";

import Header from "../../components/Header";
import AuthModal from "../Auth/AuthModal";
import Blogs from "../Blog/Blogs";
import Products from "../Display/Products";

const Home = ({
	setAuth,
	setAuthData,
	setShowModal,
	showModal,
	Auth,
	AuthData,
}) => {
	return (
		<>
			<Header
				setAuth={setAuth}
				setShowModal={setShowModal}
				setAuthData={setAuthData}
			></Header>
			<div
				style={{
					marginTop: "40px",
					backgroundColor: "rgba(64, 99, 112, 0.3)",
					minHeight: "100vh",
					minWidth: "100vw",
				}}
			>
				<div style={{ minHeight: "10vh" }}>
					<p className="text-light text-center h5 bg-dark">
						Partner With Us And Build Your Empire Of Income
					</p>
				</div>
				<div
					style={{
						backgroundColor: "rgba(255, 255, 255)",
						borderRadius: "20%",
						padding: "2vh",
					}}
				>
					{" "}
					<p className="text-center h6">
						Always Earn 25% commission on every client software subscription.{" "}
						<br />
						Also Earn additional 10% commission when partners you invite make a
						client subscription alltimes.
						<br />
						<strong className="text-decoration-underline">
							Sign In Above And Download Softwares And Start Reselling
						</strong>
					</p>{" "}
				</div>
				<div className="d-flex justify-content-center">
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/Z6bokD0ro5A?si=5Njm1OzNrUSRgWfL"
						title="Earn Online Through Techsystems Partnership"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				</div>
				<Products></Products>
				<AuthModal
					showModal={showModal}
					setShowModal={setShowModal}
					Auth={Auth}
					AuthData={AuthData}
					setAuth={setAuth}
				></AuthModal>
				<Blogs></Blogs>
			</div>
		</>
	);
};

export default Home;
