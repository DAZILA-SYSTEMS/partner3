import React, { useEffect, useState } from "react";
import { FetchInsts } from "../../Network/InstApi";
import { useSelector, useDispatch } from "react-redux";
import { PlusCircle } from "react-bootstrap-icons";
import AddInstModal from "./AddInstModal";
import { Spinner } from "react-bootstrap";

const Inst = ({ Rate, Currency }) => {
	//redux dispatch
	const dispatch = useDispatch();
	const [ShowModal, setShowModal] = useState(false);
	const [Loading, setLoading] = useState(false);
	const User = useSelector((state) => state.auth.user);
	const Finances = useSelector((state) => state.finance.finances).map(
		(finance) => ({ ...finance, type: "finance" })
	);
	const Business = useSelector((state) => state.business.businesss).map(
		(business) => ({ ...business, type: "business" })
	);
	const Schools = useSelector((state) => state.school.schools).map(
		(school) => ({ ...school, type: "school" })
	);
	const Rentals = useSelector((state) => state.rental.rentals).map(
		(rental) => ({ ...rental, type: "rental" })
	);
	const Healths = useSelector((state) => state.health.healths).map(
		(health) => ({ ...health, type: "health" })
	);

	useEffect(() => {
		LoadData();
	}, []);

	const LoadData = async () => {
		setLoading(true);
		FetchInsts(User, { type: "school" }, dispatch);
		FetchInsts(User, { type: "health" }, dispatch);
		FetchInsts(User, { type: "rental" }, dispatch);
		FetchInsts(User, { type: "business" }, dispatch);
		await FetchInsts(User, { type: "finance" }, dispatch);
		setLoading(false);
	};

	const Insts = [
		...Finances,
		...Schools,
		...Rentals,
		...Healths,
		...Business,
	].sort((a, b) => b.linker - a.linker);

	return (
		<>
			<div className="row justify-content-center">
				<div className="col-10 col-md-6 col-lg-4">
					<div className="d-flex justify-content-between mt-2">
						<p className="h5 text-primary text-center">
							You Have {Insts.length} Institutions{" "}
							{Loading ? <Spinner variant="primary" /> : null}
						</p>
						<button
							className="btn btn-sm btn-outline-success rounded-pill"
							onClick={() => setShowModal(true)}
						>
							Add <PlusCircle />
						</button>
					</div>

					{Insts.length > 0 ? (
						<table className="table table-responsive-sm table-striped">
							<tbody>
								{Insts.map((inst, index) => (
									<tr key={index}>
										<th>{inst.softwareId}</th>
										<td>{inst.instName}</td> <td>{inst.type}</td>
										<td>{inst.contact}</td>
										<td>{inst.email}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div
							className="bg-transparent"
							style={{
								minHeight: "60vh",
								paddingTop: "5vh",
							}}
						>
							<ul className="h6 text-capitalize">
								<li>Start earning by adding institutions that you get.</li>
								<li>
									{" "}
									You add them here to get your profit share once they pay.
								</li>
								<li> Ask for softwareId from client</li>
							</ul>
						</div>
					)}
				</div>
			</div>
			<AddInstModal
				Rate={Rate}
				Currency={Currency}
				showModal={ShowModal}
				setShowModal={setShowModal}
			></AddInstModal>
		</>
	);
};

export default Inst;
