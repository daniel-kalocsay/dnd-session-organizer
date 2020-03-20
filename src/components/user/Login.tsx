import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const Login = () => {
  const firebase = require("firebase");
  const auth = firebase.auth();

  const handleChange = () => {

  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }

  return (
    <div>
      <MDBContainer>
        <MDBRow center true>
          <MDBCol md="6">
            <form>
              <p className="h5 text-center mb-4">Login</p>
              <div className="grey-text">
                <MDBInput
                  label="Type your email address"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  onInput={handleChange}
                  name="email"
                />
                <MDBInput
                  label="Type your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  onInput={handleChange}
                  name="password"
                />
              </div>
              <div className="text-center">
                <MDBBtn onClick={handleSubmit}>Login</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
