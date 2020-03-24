import React from "react";
import {FirebaseProvider} from "./contexts/FirebaseContext"
import {UserProvider} from "./contexts/UserContext";

const AppWrapper = (props: any) => {
    return (
        <div style={styles.container}>
            <FirebaseProvider>
                <UserProvider>
                    {props.children}
                </UserProvider>
            </FirebaseProvider>
        </div>
    )
};

export default AppWrapper;

const styles = {
    container: {
        margin: "1em",
    }
};