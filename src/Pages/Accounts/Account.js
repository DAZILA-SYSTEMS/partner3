import React, { useEffect, useState } from "react";
import { FetchAccounts } from "../../Network/AccountApi";
import { useSelector, useDispatch } from "react-redux";
import AccountModal from "./AccountModal";
import { Spinner } from "react-bootstrap";
import { Watch } from "react-bootstrap-icons";

const Account = ({ Rate, Currency }) => {
	//redux dispatch
	const dispatch = useDispatch();
	const [ShowModal, setShowModal] = useState(false);
	const [Loading, setLoading] = useState(false);
	const User = useSelector((state) => state.auth.user);
	const Accounts = useSelector((state) => state.account.accounts).map(
		(account) => ({
			...account,
			amount: Rate === 0 ? account.amount : parseInt(account.amount * Rate),
		})
	);

	useEffect(() => {
		LoadData();
	}, []);

	const LoadData = async () => {
		setLoading(true);

		await FetchAccounts(User, dispatch);
		setLoading(false);
	};

	return (
		<>
			<div className="row justify-content-center">
				<div className="col-11 col-md-8 col-lg-6">
					<div className="d-flex justify-content-between mt-2">
						{Loading ? (
							<Spinner variant="primary" />
						) : (
							<>
								<div className="card">
									<p>
										<strong>Available Bal </strong> <br />{" "}
										{Accounts.filter(
											(account) =>
												parseInt(account.status) === 0 &&
												(account.type === "agent" ||
													account.type === "team" ||
													account.type === "bonus")
										).reduce((a, b) => +a + +b.amount, "00") -
											Accounts.filter(
												(account) => account.type === "withdraw"
											).reduce((a, b) => +a + +b.amount, "00")}
										.00 {Currency}
									</p>{" "}
									<button
										className="btn btn-outline-primary rounded-pill"
										onClick={() => setShowModal(true)}
									>
										Withdraw
									</button>
								</div>
								<div className="card">
									<p>
										<strong>Income InReview </strong> <br />{" "}
										{Accounts.filter(
											(account) =>
												parseInt(account.status) === 1 &&
												(account.type === "agent" ||
													account.type === "team" ||
													account.type === "bonus")
										).reduce((a, b) => +a + +b.amount, "00")}
										.00 {Currency}
									</p>
									<p className="text-center">
										<Watch className="text-primary h2" />
									</p>
								</div>
								<div className="card">
									<p>
										<strong>W/Ds InReview </strong> <br />{" "}
										{Accounts.filter(
											(account) =>
												parseInt(account.status) === 1 &&
												account.type === "withdraw"
										).reduce((a, b) => +a + +b.amount, "00")}
										.00 {Currency}
									</p>
									<p className="text-center">
										<Watch className="text-primary h2" />
									</p>
								</div>
							</>
						)}
					</div>

					<table className="table table-responsive-sm table-striped">
						<tbody>
							{Accounts.map((account, index) => (
								<tr key={index}>
									<th>{account.softwareId}</th>
									<td className="text-capitalize">{account.type}</td>
									{parseInt(account.status) === 0 ? (
										<td className="text-success">Approved</td>
									) : parseInt(account.status) === 1 ? (
										<td className="text-primary">In Review</td>
									) : (
										<td className="text-warning">Cancelled</td>
									)}

									<td>
										<strong>
											{account.amount}:00 {Currency}
										</strong>
									</td>
									<td>
										<em>
											{new Date(
												parseInt(account.linker || Date.now())
											).toLocaleDateString("en-US")}
										</em>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<AccountModal
				showModal={ShowModal}
				setShowModal={setShowModal}
				availableAmount={
					Accounts.filter(
						(account) =>
							parseInt(account.status) === 0 &&
							(account.type === "agent" ||
								account.type === "team" ||
								account.type === "bonus")
					).reduce((a, b) => +a + +b.amount, "00") -
					Accounts.filter((account) => account.type === "withdraw").reduce(
						(a, b) => +a + +b.amount,
						"00"
					)
				}
				Rate={Rate}
				Currency={Currency}
			></AccountModal>
		</>
	);
};

export default Account;
