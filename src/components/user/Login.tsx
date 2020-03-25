import React, {useState, useContext} from "react";
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
import {FirebaseContext} from "../contexts/FirebaseContext";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";

const Login = () => {

    const auth = useContext(FirebaseContext)!.auth;

    const [user, initializing, error] = useAuthState(auth);

    const [modal, setModal] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.currentTarget.name]: event.currentTarget.value
        });
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(loginData.email, loginData.password)
            .then((cred: firebase.auth.UserCredential) => {
                console.log(cred.user);
            });
        setModal(false);
    };

    const toggle = () => {
        setModal(!modal);
    };

    if (initializing) {
        return (
            <div>
                <p>Initialising User...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            {user ?
                <div>
                    {user.email}
                </div> :
                <div>
                    <MDBBtn onClick={toggle}>Login</MDBBtn>
                    <MDBModal isOpen={modal} toggle={toggle}>
                        <MDBModalHeader>Login</MDBModalHeader>
                        <MDBModalBody>
                            <MDBRow center true>
                                <MDBCol>
                                    <form>
                                        <div className="grey-text">
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
                                Login
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </div>
            }
        </div>
    );
};

export default Login;
