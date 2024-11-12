import React, { lazy, Suspense, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./Pages/Auth/ResetPassword";
import image from "./assets/images/tech-systems-agent-logo.jpg";
import Profile from "./Pages/Auth/Profile";
import Dashboard from "./Pages/Dashboard/Dashboard";
import HomeDash from "./Pages/Dashboard/HomeDash";
import Team from "./Pages/Team/Team";
import Inst from "./Pages/Insts/Inst";
import Account from "./Pages/Accounts/Account";
import { FetchExchange } from "./Network/AccountApi";
import { CountryList, UserZone } from "./Utils/Const";
import Blogs from "./Pages/Blog/Blogs";

const Home = lazy(() => import("./Pages/Home/Home"));

const App = () => {
	const [showModal, setShowModal] = useState(false);
	const [Auth, setAuth] = useState("Login");
	const [AuthData, setAuthData] = useState({});
	const [Rate, setRate] = useState(0);
	const [Currency, setCurrency] = useState("USD");

	const FetchRates = async () => {
		let Res = await FetchExchange();
		if (Res.status === 200) {
			if (Intl) {
				let TzArr = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/");
				let userCity = TzArr[TzArr.length - 1];
				let userCountry = UserZone[userCity];
				let userCurrency = CountryList.find(
					(country) =>
						country.countryName.toLowerCase() === userCountry.toLowerCase()
				);

				setCurrency(userCurrency.currencyCode || Currency);

				setRate(Res.data[(userCurrency || {}).currencyCode] || Rate);
			}
		}
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				minWidth: "100vw",
				backgroundImage: `url(${image})`,
				backgroundRepeat: "repeat",
				backgroundPosition: "center",
			}}
		>
			<BrowserRouter basename="/">
				<Suspense
					fallback={
						<div className="d-flex justify-content-center align-items-center">
							<span className="spinner-border text-primary"></span>
						</div>
					}
				>
					<Routes>
						<Route path="/blog/:access" element={<Blogs></Blogs>} />
						<Route
							path="/:code"
							element={
								<Home
									setAuth={setAuth}
									setAuthData={setAuthData}
									setShowModal={setShowModal}
									showModal={showModal}
									Auth={Auth}
									AuthData={AuthData}
								></Home>
							}
						/>

						<Route
							path="/"
							element={
								<Home
									setAuth={setAuth}
									setAuthData={setAuthData}
									setShowModal={setShowModal}
									showModal={showModal}
									Auth={Auth}
									AuthData={AuthData}
								></Home>
							}
						/>

						<Route path="/reset/:reset/:logger" element={<ResetPassword />} />

						<Route
							path="/portal"
							element={<Dashboard FetchRates={FetchRates} />}
						>
							<Route path="/portal" element={<HomeDash />}></Route>{" "}
							<Route
								path="profile"
								element={
									<Profile
										setAuth={setAuth}
										setAuthData={setAuthData}
										setShowModal={setShowModal}
										showModal={showModal}
										Auth={Auth}
										AuthData={AuthData}
									></Profile>
								}
							/>{" "}
							<Route path="team" element={<Team></Team>} />
							<Route
								path="institutions"
								element={<Inst Rate={Rate} Currency={Currency}></Inst>}
							/>
							<Route
								path="account"
								element={<Account Rate={Rate} Currency={Currency}></Account>}
							/>
						</Route>

						{/*<Route path="*" element={<NotFound />} />*/}
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	);
};

export default App;
