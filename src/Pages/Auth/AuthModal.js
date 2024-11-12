import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/AuthSlice";
import {
	CheckLiveUser,
	ForgotPassword,
	LiveLogIn,
	RegisterUser,
} from "../../Network/AuthApi";
import swal from "sweetalert";
import { Countries, UserZone } from "../../Utils/Const";
import { useNavigate, useParams } from "react-router-dom";

const AuthModal = ({ showModal, setShowModal, Auth, AuthData }) => {
	const User = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const params = useParams();
	const [email, setEmail] = useState("");
	const [Country, setCountry] = useState(null);
	const [Phone, setPhone] = useState("");
	const [Name, setName] = useState("");
	const [Lover, setLover] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [LoginError, setLoginError] = useState(false);
	const [RegisterError, setRegisterError] = useState(false);
	const [Loading, setLoading] = useState(false);

	useEffect(() => {
		CheckLogger();
		setRegisterError(false);
		setLoginError(false);
		setLoading(false);
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setPhone("");
		setName("");

		if (Intl) {
			let TzArr = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/");
			let userCity = TzArr[TzArr.length - 1];
			let userCountry = UserZone[userCity];
			let CountryCode = Countries.find(
				(country) => country.Name === userCountry
			);
			setCountry((CountryCode || {}).MobileCode);
		}
	}, [User, showModal]);

	//redux dispatch
	const dispatch = useDispatch();

	const CheckLogger = () => {
		if (User.token) {
			navigate(`/portal`);
			return;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (confirmPassword !== password && Auth === "Register") {
			return;
		}
		setLoading(true);

		let liveUser = await CheckLiveUser(email);

		if (Auth === "Register") {
			if (liveUser === "register" || liveUser === 0) {
				Register();
			} else {
				setRegisterError(true);
			}
		} else {
			LoginUser();
		}
		setLoading(false);
	};

	const Register = async () => {
		let linker = Date.now();

		let UserLive = await RegisterUser(
			email,
			password,
			linker,
			linker,
			Phone,
			Country,
			Name,
			params.code
		);
		if (UserLive.token && UserLive.user) {
			dispatch(
				login({
					email,
					//   password,
					linker: UserLive.user.linker,
					phone: UserLive.user.phone,
					name: UserLive.user.name,
					country: UserLive.user.country,
					live: 1,
					token: UserLive.token,
					logger: UserLive.user.logger,
					userId: UserLive.user.id,
				})
			);

			setEmail("");
			setName("");
			setPhone("");
			setCountry("");
			setPassword("");
			setConfirmPassword("");
			setShowModal(false);
			navigate(`/portal`);
		}
	};

	const LoginUser = async () => {
		let UserLive = await LiveLogIn(email, password);
		if (UserLive.token && UserLive.user) {
			dispatch(
				login({
					email,
					// password,
					linker: UserLive.user.linker,
					name: UserLive.user.name,
					phone: UserLive.user.phone,
					live: 1,
					token: UserLive.token,
					logger: UserLive.user.logger,
					userId: UserLive.user.id,
				})
			);
			setShowModal(false);
			navigate(`/portal`);
		} else {
			setLoginError(true);
		}
	};

	const PasswordForgot = async () => {
		if (email === "") {
			swal({
				title: "Enter Email",
				icon: "warning",
				timer: 3000,
			});
			return;
		}
		setLoading(true);
		let res = await ForgotPassword(email);
		if (res.status == 200) {
			swal({
				title: `Reset link has been sent to ${email}`,
				icon: "success",
			});
		} else {
			swal({
				title: `${email} not found`,
				icon: "warning",
				timer: 3000,
			});
		}
		setLoading(false);
	};

	return (
		<>
			{/*
      <div className="d-flex justify-content-around">
        <Button
          variant="outline-primary"
          size="lg"
          onClick={() => handleModalOpen("Login")}
        >
          Login
        </Button>
        <Button
          variant="outline-info"
          size="lg"
          onClick={() => handleModalOpen("Register")}
        >
          Register
        </Button>
  </div>*/}
			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
				centered
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{Auth}{" "}
						{LoginError ? (
							<small className="text-danger">
								<em style={{ fontSize: 12 }}>Invalid Login Details</em>
							</small>
						) : null}
						{RegisterError ? (
							<small className="text-danger">
								<em style={{ fontSize: 12 }}>Details Already Used</em>
							</small>
						) : null}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						{Auth === "Register" ? (
							<Form.Group controlId="formConfirmPassword">
								<label>Your Name :</label>
								<input
									value={Name}
									placeholder="Enter Your Name"
									onChange={(e) => setName(e.target.value)}
									required
									className="form-control rounded"
								/>
								<hr />{" "}
							</Form.Group>
						) : null}
						{AuthData.from === "lovers" ? (
							<Form.Group controlId="formConfirmPassword">
								<label>Lover Name :</label>
								<input
									value={Lover}
									placeholder="Enter Lover Name"
									onChange={(e) => setLover(e.target.value)}
									required
									className="form-control rounded"
								/>
								<hr />{" "}
							</Form.Group>
						) : null}
						{Auth === "Register" ? (
							<>
								{!Country ? (
									<Form.Group controlId="formConfirmPassword">
										<label>Select Country :</label>
										<select
											className="form-control rounded"
											value={Country}
											required
											onChange={(e) => setCountry(e.target.value)}
										>
											<option value={""}>Select Country</option>
											{Countries.map((country, index) => (
												<option key={index} value={country.MobileCode}>
													{country.Name}
												</option>
											))}
										</select>
										<hr />{" "}
									</Form.Group>
								) : null}
								<Form.Group controlId="formConfirmPassword">
									<label>Your Phone Number :</label>
									<input
										value={Phone}
										placeholder="Enter Your Phone Number"
										onChange={(e) => setPhone(e.target.value)}
										required
										className="form-control rounded"
									/>
									<hr />{" "}
								</Form.Group>
							</>
						) : null}
						<Form.Group controlId="formEmail">
							<Form.Label>Email address : </Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>
						<hr />
						<Form.Group controlId="formPassword">
							<Form.Label>Password :</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
						<hr />
						{Auth === "Register" ? (
							<>
								<Form.Group controlId="formConfirmPassword">
									<Form.Label>
										Confirm Password :{" "}
										<small className="text-danger">
											{confirmPassword != "" && confirmPassword != password
												? "Not Matching"
												: ""}
										</small>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Confirm Password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
									/>
								</Form.Group>
								<hr />
							</>
						) : null}
						<div className="d-flex justify-content-around mb-2">
							{!Loading ? (
								<>
									<Button variant="primary" type="submit">
										Submit
									</Button>
									<span onClick={() => PasswordForgot()}>
										<small>
											<em
												className="text-primary btn-link"
												style={{ cursor: "pointer" }}
											>
												forgot password
											</em>
										</small>
									</span>
								</>
							) : (
								<Spinner variant="secondary" />
							)}

							<Button
								variant="secondary"
								type="button"
								onClick={() => setShowModal(false)}
							>
								Cancel
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default AuthModal;
