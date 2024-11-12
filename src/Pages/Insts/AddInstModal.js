import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { AddInst } from "../../Network/InstApi";

const AddInstModal = ({ showModal, setShowModal, Rate, Currency }) => {
	const User = useSelector((state) => state.auth.user);

	const [Email, setEmail] = useState("");
	const [SoftwareId, setSoftwareId] = useState("");

	const [Name, setName] = useState("");
	const [Contact, setContact] = useState("");
	const [Type, setType] = useState("");
	const [Cost, setCost] = useState("");
	const [Loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(false);
		setEmail("");
		setSoftwareId("");
		setCost("");
		setContact("");
		setType("");
		setName("");
	}, [showModal]);

	//redux dispatch
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (1 === 1) {
			//verify software id here
		}
		setLoading(true);

		await RegisterInst();

		setLoading(false);
		setShowModal(false);
	};

	const RegisterInst = async () => {
		await AddInst(
			User,
			{
				email: Email,
				softwareId: SoftwareId,
				cost: Rate === 0 ? Cost : Cost / Rate,
				contact: Contact,
				instName: Name,
				type: Type,
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
					<Modal.Title>Add Institution</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formPassword">
							<Form.Label>softwareId From Client Software :</Form.Label>
							<Form.Control
								type="number"
								placeholder="enter softwareId"
								value={SoftwareId}
								onChange={(e) => setSoftwareId(e.target.value)}
								required
							/>{" "}
							<hr />
						</Form.Group>

						<Form.Group controlId="formConfirmPassword">
							<label>Institution Name :</label>
							<input
								value={Name}
								placeholder="Enter Institution Name"
								onChange={(e) => setName(e.target.value)}
								required
								className="form-control rounded"
							/>
							<hr />{" "}
						</Form.Group>

						<Form.Group controlId="formConfirmPassword">
							<label>Institution Contact :</label>
							<input
								value={Contact}
								placeholder="Enter Instituion Contact"
								onChange={(e) => setContact(e.target.value)}
								required
								className="form-control rounded"
								type="number"
							/>
							<hr />{" "}
						</Form.Group>
						<Form.Group controlId="formEmail">
							<Form.Label>Institution Email : </Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter Institution email"
								value={Email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<hr />
						</Form.Group>

						<Form.Group controlId="formConfirmPassword">
							<label>Select Instituion Type :</label>
							<select
								className="form-control rounded"
								value={Type}
								required
								onChange={(e) => setType(e.target.value)}
							>
								<option value={""}>Select Type</option>
								<option value={"school"}>School/College</option>
								<option value={"finance"}>Sacco/Microfinance</option>
								<option value={"health"}>Hospital/Clinic</option>
								<option value={"rental"}>Rentals/Hostels</option>
								<option value={"business"}>Business/POS</option>
							</select>
							<hr />{" "}
						</Form.Group>
						<Form.Group controlId="formConfirmPassword">
							<label>
								Agreed Cost {`{${Currency}}`} Per Year :{" "}
								{`{A client can pay monthly where the value shall be divided by 12}`}
								<em>
									{`Minimum cost ${parseInt(Rate === 0 ? 72 : 72 * Rate) + 1} `}
									{Currency}
								</em>
							</label>
							<input
								value={Cost}
								placeholder="Enter agreed cost"
								onChange={(e) => setCost(e.target.value)}
								required
								className="form-control rounded"
								type="number"
								min={Rate === 0 ? 72 : parseInt(72 * Rate) + 1}
							/>
							<hr />{" "}
							<p>
								{" "}
								<strong>
									{" "}
									<em>{`Translates to : ${
										!/^$/.test(Cost) ? Cost * 5 : 0
									} For One Time Purchase`}</em>
								</strong>
							</p>
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

export default AddInstModal;
