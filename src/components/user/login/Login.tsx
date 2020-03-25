import React, {useContext, useState} from "react";

import {FirebaseContext} from "../../contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

import {MDBBtn} from "mdbreact";

import LoginModal from "./LoginModal";

const Login = () => {

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, error] = useAuthState(auth);

    const [open, setOpen] = useState(false);

    const show = () => { setOpen(true); };
    const hide = () => { setOpen(false); };

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
            <MDBBtn onClick={show}>Login</MDBBtn>
            <LoginModal open={open} show={show} hide={hide} />
        </div>
    );
};

export default Login;
