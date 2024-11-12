import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { login } from "../../reducers/AuthSlice";
import { EditLiveUser } from "../../Network/AuthApi";

const EditProfile = (props) => {
  const User = useSelector((state) => state.auth.user);

  const [Name, setName] = useState(User.name);
  const [Phone, setPhone] = useState(User.phone);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setName(User.name);
    setPhone(User.phone);
  }, []);

  //redux dispatch
  const dispatch = useDispatch();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let linker = Date.now();
    dispatch(login({ ...User, name: Name, trace: linker }));
    await EditLiveUser(User, Name, Phone, linker, dispatch);
    setLoading(false);
    props.setShowModal(false);
  };

  return (
    <Modal
      show={props.ShowModal}
      onHide={() => {
        props.setShowModal(false);
        setName(User.name);
      }}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="text-capitalize text-center">Edit Profile</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={HandleSubmit}>
          <div className="form-group">
            <label className="mb-2 text-capitalize"> Name:</label>
            <input
              className="rounded form-control"
              placeholder={`enter profile name`}
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <hr />
          </div>
          <div className="form-group">
            <label className="mb-2 text-capitalize"> Phone:</label>
            <input
              className="rounded form-control"
              placeholder={`enter profile name`}
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              type="number"
            />
            <hr />
          </div>

          <div className="d-flex justify-content-around mb-2">
            {Loading ? (
              <span className="spinner-border text-primary"></span>
            ) : (
              <Button variant="primary" type="submit">
                Save
              </Button>
            )}

            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                props.setShowModal(false);
                setName(User.name);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfile;
