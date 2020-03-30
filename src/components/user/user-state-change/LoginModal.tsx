import React, {useContext, useState} from "react";
import {
    MDBBtn,
    MDBCol,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader,
    MDBRow
} from "mdbreact";

import firebase from "firebase";
import {FirebaseContext} from "../../contexts/FirebaseContext";

const LoginModal = (props: any) => {
    const auth = useContext(FirebaseContext)!.auth;

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

        auth.signInWithEmailAndPassword(loginData.email, loginData.password)
            .then((cred: firebase.auth.UserCredential) => {
                console.log(cred.user);
            });

        props.hide();
    };

    return (
        <div>
            <MDBModal isOpen={props.open} >
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
                    <MDBBtn color="secondary" onClick={props.hide}>
                        Close
                    </MDBBtn>
                    <MDBBtn onClick={handleSubmit} color="primary">
                        Login
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </div>
    )
};

export default LoginModal;