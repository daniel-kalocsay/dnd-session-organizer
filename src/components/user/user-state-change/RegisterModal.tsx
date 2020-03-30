import React, {useState, useContext} from "react";
import firebase from 'firebase';
import {FirebaseContext} from "../../contexts/FirebaseContext";
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

const RegisterModal = (props: any) => {
    const auth = useContext(FirebaseContext)!.auth;
    const usersDB = firebase.firestore().collection('users');

    const [registrationData, setRegistrationData] = useState({
        email: "",
        password: "",
        userName: ""
    });

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setRegistrationData({
            ...registrationData,
            [event.currentTarget.name]: event.currentTarget.value
        });
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(
                registrationData.email,
                registrationData.password
            )
            .then((cred: firebase.auth.UserCredential) => {
                let id = cred.user!.uid;
                usersDB.doc(id).set({ username: registrationData.userName })
            });
        props.hide();
    };

    return (
        <div>
            <MDBContainer>
                <MDBModal isOpen={props.open} >
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
                        <MDBBtn color="secondary" onClick={props.hide}>
                            Close
                        </MDBBtn>
                        <MDBBtn onClick={handleSubmit} color="primary">
                            Sign Up
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </div>
    )
};

export default RegisterModal;