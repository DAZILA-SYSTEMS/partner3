import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import { ResetPasswordApi } from "../../Network/AuthApi";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const [Confirm, setConfirm] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let res = await ResetPasswordApi(params.logger, params.reset, Password);
    setLoading(false);
    if (res.status === 200) {
      swal({
        title: `Password Reset Sucessfull`,
        text: `Continue With Login`,
        icon: "success",
        buttons: true,
      })
        .then((willReturn) => {
          if (willReturn) {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    } else {
      swal({
        title: `Password Reset failed`,
        text: "Try Again",
        icon: "warning",
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="row justify-content-center" style={{ marginTop: "40px" }}>
        <div className="col-md-6">
          <div className="card m-2">
            <Form onSubmit={handleSubmit}>
              <p className="text-center">Reset {params.logger} Password</p>

              <div className="form-group m-2">
                <label>Password :</label>
                <input
                  placeholder="Enter Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control rounded"
                  required
                  type="password"
                />
              </div>
              <hr />
              <div className="form-group m-2">
                <label>
                  Confirm Password :{" "}
                  <small className="text-danger">
                    {Confirm != "" && Confirm != Password ? "Not Matching" : ""}
                  </small>
                </label>
                <input
                  placeholder="Confirm Password"
                  value={Confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="form-control rounded"
                  required
                  type="password"
                />
              </div>
              <div className="d-flex justify-content-around m-2">
                {!Loading ? (
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                ) : (
                  <Spinner variant="secondary" />
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
