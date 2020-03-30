import React, {useContext, useState} from "react";

import {FirebaseContext} from "../contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

import Login from "./user-state-change/login/Login";
import Register from "./user-state-change/register/Register";
import Logout from "./user-state-change/Logout";
import { Button } from "@material-ui/core";
import {MDBBtn} from "mdbreact";

const UserInfo = () => {
    //TODO make this component work wrapped in WithAuth instead

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
                <div>Authenticating User...</div>
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
                <div style={styles.userInfo}>
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
            <div>You are not logged in</div>
            <div style={styles.buttons}>
                <Login open={loginOpen} show={showLogin} hide={hideLogin} />
                <Register open={registerOpen} show={showRegister} hide={hideRegister}/>
            </div>
        </div>
    )
};

export default UserInfo;

const styles = {
    container: {
        display: "grid",
        gridTemplate: "repeat(auto-fit, 1fr)",
        gridGap: "1em",
        alignItems: "center",
    },
    userInfo: {
        gridColumn: "1/2"
    },
    buttons: {
        gridColumn: "2/3",
        display: "grid",
        gridAutoFlow: "column",
        gridGap: "1em"
    }
};