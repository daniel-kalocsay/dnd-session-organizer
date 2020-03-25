import CombatField from "../combat/CombatField";
import React, {useContext} from "react";
import Players from "../combat/Players";
import Menu from "../combat/Menu";
import {useAuthState} from "react-firebase-hooks/auth";
import {FirebaseContext} from "../contexts/FirebaseContext";

const CombatView = () => {

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, error] = useAuthState(auth);

    if (initializing) {
        return (
            <div>
                <h1>Loading grid...</h1>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <h1>Error loading grid: {error}</h1>
            </div>
        );
    }

    if (user) {
        return (
            <div style={styles.combatViewWrapper}>
                <div style={styles.playersContainer}>
                    <Players />
                </div>

                <div style={styles.gridContainer}>
                    <CombatField />
                </div>

                <div style={styles.sideBar}>
                    <div>This is the sidebar</div>
                </div>

                <div style={styles.menuContainer}>
                    <Menu />
                </div>
            </div>
        )
    }

    return <div>Please log in!</div>;
};

export default CombatView;

const styles = {
    combatViewWrapper: {
        display: "grid",
        gridTemplate: "repeat(auto-fit, 1fr)",
        gridGap: "1em",
        // margin: "1em",
        // width: "95vw",
        // height: "95vh",
    },
    playersContainer: {
        gridColumn: "1/2",
        gridRow: "1/8",
        border: "2px solid gray",
        background: "#eee",
        // resize: "horizontal",
    },
    gridContainer: {
        gridColumn: "2/8",
        gridRow: "1/8",
        border: "2px solid gray",
        background: "#eee"
    },
    sideBar: {
        gridColumn: "8/10",
        gridRow: "1/8",
        border: "2px solid gray",
        background: "#eee"
    },
    menuContainer: {
        gridColumn: "1/10",
        gridRow: "8/10",
        border: "2px solid gray",
        background: "#eee",
    },
};