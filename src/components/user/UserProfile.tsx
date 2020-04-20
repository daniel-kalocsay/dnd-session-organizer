import React, {useContext, useEffect, useState} from "react";

import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";

import Logout from "./user-state-change/logout/Logout";
import ModalWrapper from "../../wrappers/ModalWrapper";
import LoginForm from "./user-state-change/login/LoginForm";
import RegisterForm from "./user-state-change/register/RegisterForm";

const UserProfile = () => {
    //TODO make this component work wrapped in WithAuth instead?

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, error] = useAuthState(auth);

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

                <ModalWrapper buttonName={"Log in"}  >
                    <LoginForm />
                </ModalWrapper>

                <ModalWrapper buttonName={"register"}>
                    <RegisterForm />
                </ModalWrapper>

            </div>
        </div>
    )
};

export default UserProfile;

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