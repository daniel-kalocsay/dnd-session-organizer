import React, {useContext} from "react";
import {FirebaseContext} from "../components/contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

const WithAuth = (props: any) => {

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, error] = useAuthState(auth);

    const loadingMsg = props.loadingMsg ? props.loadingMsg : "Loading...";
    const errorMsg = props.errorMsg ? props.errorMsg : "An error has occurred";
    const unauthorizedMsg = props.unauthorizedMsg ? props.unauthorizedMsg : "";

    if (initializing) {
        return (
            <div style={styles.container}>
                {loadingMsg}
            </div>
        );
    }

    if (error) {
        console.log(error);

        return (
            <div style={styles.error}>
                {errorMsg}
            </div>
        );
    }

    if (user) {
        return (
            <div>
                {props.children}
            </div>
        )
    }

    const altComponent = props.alternative;

    return (
        <div style={styles.alternative}>
            {altComponent ? altComponent :
                <div style={styles.unauthorized}>
                    {unauthorizedMsg}
                </div>}
        </div>
    )
};

export default WithAuth;

const styles = {
    container: {
        display: "grid",
        justifyContent: "center",
        alignItems: "center"
    },
    error: {
        // styling
    },
    alternative: {
        // styling
    },
    unauthorized: {
        // styling
    }
};