import React from "react";

import { FirebaseProvider } from "./components/contexts/FirebaseContext";
import { UserProvider } from "./components/contexts/UserContext";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

const AppWrapper = (props: any) => {
    return (
        <div style={styles.container}>
            <FirebaseProvider>
                <UserProvider>
                    <DndProvider backend={Backend}>
                        {props.children}
                    </DndProvider>
                </UserProvider>
            </FirebaseProvider>
        </div>
    );
};

export default AppWrapper;

const styles = {
    container: {
        margin: "1em",
    },
};
