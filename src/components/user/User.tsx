import React, {useContext, useState} from "react";

import {FirebaseContext} from "../contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

import Login from "./user-state-change/Login";
import LoginModal from "./user-state-change/LoginModal";
import Register from "./user-state-change/Register";
import RegisterModal from "./user-state-change/RegisterModal";
import Logout from "./user-state-change/Logout";

import {MDBBtn} from "mdbreact";

const User = () => {
    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, error] = useAuthState(auth);

    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const showLogin = () => { setLoginOpen(true); };
    const hideLogin = () => { setLoginOpen(false); };
    const showRegister = () => { setRegisterOpen(true); };
    const hideRegister = () => { setRegisterOpen(false); };

    if (initializing) {
        return (
            <div>
                <p>Authenticating User...</p>
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
            <div style={styles.container}>
                <div style={styles.user}>
                    <div>Logged in as {user.email}</div>
                </div>
                <div style={styles.buttons}>
                    <Logout />
                </div>
            </div>
        )
    }

    return (
        <div style={styles.container}>
            <div style={styles.user}>
                <MDBBtn onClick={showLogin}>Login</MDBBtn>
                <LoginModal open={loginOpen} show={showLogin} hide={hideLogin} />
            </div>
            <div style={styles.buttons}>
                <MDBBtn onClick={showRegister}>Sign Up</MDBBtn>
                <RegisterModal open={registerOpen} show={showRegister} hide={hideRegister}/>
            </div>
        </div>
    )
};

export default User;

const styles = {
    container: {
        display: "grid",
        gridTemplate: "repeat(auto-fit, 1fr)",
        gridGap: "1em",
        alignItems: "center"
    },
    user: {
        gridColumn: "1/2"
    },
    buttons: {
        gridColumn: "2/3"
    }
};