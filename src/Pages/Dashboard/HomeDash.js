import React from "react";
import { Bank, CashCoin, People, Person } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HomeDash = () => {
  const navigate = useNavigate();
  const User = useSelector((state) => state.auth.user);
  return (
    <div className="row m-3 d-flex justify-content-around">
      {" "}
      <div className="col-12 col-md-6">
        <div
          className="dashboard"
          onClick={() => {
            navigate(`profile`);
          }}
        >
          <div className="d-flex justify-content-center">
            <Person className="dash-icon" />
          </div>
          <p className="text-center dash-text text-capitalize">
            {User.name || User.logger}
          </p>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div
          className="dashboard"
          onClick={() => {
            navigate(`account`);
          }}
        >
          <div className="d-flex justify-content-center">
            <CashCoin className="dash-icon" />
          </div>
          <p className="text-center dash-text">My Account</p>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div
          className="dashboard"
          onClick={() => {
            navigate(`team`);
          }}
        >
          <div className="d-flex justify-content-center">
            <People className="dash-icon" />
          </div>
          <p className="text-center dash-text">My Team</p>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div
          className="dashboard"
          onClick={() => {
            navigate(`institutions`);
          }}
        >
          <div className="d-flex justify-content-center">
            <Bank className="dash-icon" />
          </div>
          <p className="text-center dash-text">My Institutions</p>
        </div>
      </div>{" "}
    </div>
  );
};

export default HomeDash;
