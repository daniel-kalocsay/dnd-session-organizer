import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const Login = () => {
  const firebase = require("firebase");
  const auth = firebase.auth();
  const userDatabase = firebase.database();

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
                  label="Type your username"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  onInput={this.handleChange}
                  name="username"
                />
                <MDBInput
                  label="Type your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  onInput={this.handleChange}
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
