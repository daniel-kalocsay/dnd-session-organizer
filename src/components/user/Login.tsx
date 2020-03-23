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

const Login = () => {
    const auth = useContext(FirebaseContext)!.auth();

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
        auth.signInWithEmailAndPassword(loginData.email, loginData.password)
            .then( (cred: any) => {
                console.log(cred.user);
            });
        setModal(false);
    };

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <div>
            <MDBContainer>
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
            </MDBContainer>
        </div>
    );
};

export default Login;
