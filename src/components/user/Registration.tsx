import React, { useState } from "react";
import 'mdbreact/dist/css/mdb.css'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const Registration = () => {
  const firebase = require("firebase");
  const auth = firebase.auth();
  const userDatabase = firebase.database();

  const [userRegistrationData, setUserRegistrationData] = useState({});

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUserRegistrationData({
      [event.currentTarget.name]: event.currentTarget.value
    });
    console.log(userRegistrationData);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

  };

  return (
    <MDBContainer>
      <MDBRow center true>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Sign up</p>
            <div className="grey-text">
              <MDBInput
                label="First name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onInput={handleChange}
                name="firstName"
              />
              <MDBInput
                label="Last name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onInput={handleChange}
                name="lastName"
              />
              <MDBInput
                label="Username"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onInput={handleChange}
                name="userName"
              />
              <MDBInput
                label="Your email"
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
                label="Your password"
                icon="lock"
                group
                type="password"
                validate
                onInput={handleChange}
                name="password"
              />
              <MDBInput
                label="Confirm password"
                icon="lock"
                group
                type="password"
                validate
                onInput={handleChange}
                name="confirmedPassword"
              />
            </div>
            <div className="text-center">
              <MDBBtn onClick={handleSubmit} color="primary">
                Sign up
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Registration;
