import React, {useState, useContext} from "react";
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
import {UserContext} from "../../contexts/UserContext";
import {useAuthState} from "react-firebase-hooks/auth";
import RegisterModal from "./RegisterModal";

interface firebaseUserObject {
    user: { uid: string };
}

const Register: React.FC = () => {

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, error] = useAuthState(auth);

    const [open, setOpen] = useState(false);

    const show = () => {
        setOpen(true);
    };

    const hide = () => {
        setOpen(false);
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

    if (user) {
        return (
            <div>
                {user.email}
            </div>
        )
    }

    return (
        <div>
            <MDBBtn onClick={show}>Sign Up</MDBBtn>
            <RegisterModal open={open} show={show} hide={hide}/>
        </div>
    )
};

export default Register;
