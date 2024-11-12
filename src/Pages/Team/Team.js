import React, { useEffect, useState } from "react";
import { FetchTeam } from "../../Network/TeamApi";
import { useSelector, useDispatch } from "react-redux";
import { Countries } from "../../Utils/Const";
import { Spinner } from "react-bootstrap";

const Team = () => {
	//redux dispatch
	const dispatch = useDispatch();
	const User = useSelector((state) => state.auth.user);
	const Teams = useSelector((state) => state.team.team)
		.filter((team) => team)
		.sort((a, b) => b.id - a.id);
	const [Loading, setLoading] = useState(false);
	const FindCountry = (code) =>
		Countries.find((country) => country.MobileCode === code);

	useEffect(() => {
		LoadData();
	}, []);

	const LoadData = async () => {
		setLoading(true);
		await FetchTeam(User, dispatch);
		setLoading(false);
	};

	return (
		<div className="row justify-content-center">
			<div className="col-10 col-md-6 col-lg-4">
				<p className="h6 text-primary text-center">
					You Have {Teams.length} Associate Partners{" "}
					{Loading ? <Spinner variant="primary" /> : null}
					<br />
					<em className="btn-link">
						https://partner.techsystems.world/{User.userId + 1000}
					</em>
				</p>
				{Teams.length > 0 ? (
					<table className="table table-responsive-sm table-striped">
						<tbody>
							{Teams.map((team, index) => (
								<tr key={index}>
									<th className="text-capitalize">{team.name}</th>
									<td>{(FindCountry(team.country) || {}).Name}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div
						className="bg-transparent"
						style={{
							minHeight: "60vh",
						}}
					>
						<ul className="list-group-flush">
							<li className="list-item">
								Enlarge your empire by inviting associates
							</li>
							<li className="list-item">
								Associates are other partners that you invite to the
								organization.
							</li>
							<li className="list-item">
								You will earn 10% from each associate sale
							</li>
							<li className="list-item">
								The Income will be recurrent whenever the associate client makes
								a payment
							</li>
							<li className="list-item">
								Use this link to invite your associate partners
							</li>
							<li className="list-item">
								{" "}
								<span className="btn-link">
									https://partner.techsystems.world/{User.userId + 1000}
								</span>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Team;
