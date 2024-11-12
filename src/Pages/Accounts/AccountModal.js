import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddAccount } from "../../Network/AccountApi";

const AccountModal = ({
	showModal,
	setShowModal,
	availableAmount,
	Currency,
	Rate,
}) => {
	const User = useSelector((state) => state.auth.user);

	const [Email, setEmail] = useState("");
	const [Amount, setAmount] = useState("");

	const [Loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(false);
		setEmail("");
		setAmount("");
	}, [showModal]);

	//redux dispatch
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (1 === 1) {
			//verify software id here
		}
		setLoading(true);

		await Withdaraw();

		setLoading(false);
		setShowModal(false);
	};

	const Withdaraw = async () => {
		await AddAccount(
			User,
			{
				email: Email.toLowerCase(),
				amount: Rate === 0 ? Amount : parseInt(Amount / Rate),
			},
			dispatch
		);
	};

	return (
		<>
			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
				centered
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title>Withdraw</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formPassword">
							<Form.Label>Amount :</Form.Label>
							<Form.Control
								type="number"
								placeholder="enter amount"
								value={Amount}
								min={Rate === 0 ? 1 : parseInt(Rate) + 1}
								max={availableAmount}
								onChange={(e) => setAmount(e.target.value)}
								required
							/>{" "}
							<hr />
						</Form.Group>

						<Form.Group controlId="formConfirmPassword">
							<label>
								{`${
									Currency === "KES" ? (
										"Mpesa Number"
									) : (
										<>
											Paypal Email :
											<em>
												<small>
													{
														"{If you don`t have just go to paypal.com and create one}"
													}
												</small>
											</em>{" "}
										</>
									)
								}`}
							</label>
							<input
								value={Email}
								type={`${Currency === "KES" ? "number" : "email"}`}
								placeholder={`${
									Currency === "KES"
										? "Enter Mpesa Number"
										: "Enter Paypal Email"
								}`}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="form-control rounded"
							/>
							<hr />{" "}
						</Form.Group>

						<div className="d-flex justify-content-around mb-2">
							{!Loading ? (
								<Button variant="primary" type="submit">
									Submit
								</Button>
							) : (
								<Spinner variant="secondary" />
							)}
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default AccountModal;
