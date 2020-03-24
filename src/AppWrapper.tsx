import React from "react";
import {FirebaseProvider} from "./components/contexts/FirebaseContext"
import {UserProvider} from "./components/contexts/UserContext";

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