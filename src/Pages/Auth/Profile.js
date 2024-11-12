import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Pencil,
  PersonCircle,
  Power,
  Phone,
  Mailbox,
} from "react-bootstrap-icons";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/AuthSlice";

const Profile = ({}) => {
  //redux dispatch
  const dispatch = useDispatch();

  const User = useSelector((state) => state.auth.user);

  const [EditModal, setEditModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-6 pt-2">
          <div className="card rounded">
            <div className="card-header">
              <p className="card-title h6 text-center">
                <PersonCircle /> {User.name}
              </p>
            </div>
            <div className="card-body">
              <p>
                <strong>
                  <Phone /> Phone :
                </strong>{" "}
                <em>{User.phone}</em>
              </p>
              <hr />
              <p>
                <strong>
                  <Mailbox /> Email :
                </strong>{" "}
                <em>{User.logger}</em>
              </p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button
                className="btn btn-sm btn-outline-warning rounded-pill"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                <Power /> Logout
              </button>

              <button
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => {
                  setEditModal(true);
                }}
              >
                <Pencil /> Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditProfile
        ShowModal={EditModal}
        setShowModal={setEditModal}
      ></EditProfile>
    </>
  );
};

export default Profile;
