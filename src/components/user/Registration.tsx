import React, { useState, useContext } from "react";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FirebaseContext } from "../contexts/FirebaseContext";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import { UserContext } from "../contexts/UserContext";

const Registration: React.FC = () => {
  const auth = useContext(FirebaseContext)!.auth();
  const userInfo = useContext(UserContext);

  const [registrationData, setRegistrationData] = useState({
    email: "",
    password: ""
  });

  const [modal, setModal] = useState(false);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setRegistrationData({
      ...registrationData,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        registrationData.email,
        registrationData.password
      )
      .then((cred: any) => {
        console.log(cred);
      });
    setModal(false);
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      {userInfo!.isUserLoggedIn ? "" : (
        <MDBContainer>
          <MDBBtn onClick={toggle}>Sign Up</MDBBtn>
          <MDBModal isOpen={modal} toggle={toggle}>
            <MDBModalHeader>Sign Up</MDBModalHeader>
            <MDBModalBody>
              <MDBRow center true>
                <MDBCol>
                  <form>
                    <div className="grey-text">
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
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggle}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit} color="primary">
                Sign Up
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      )}
    </div>
  );
};

export default Registration;
