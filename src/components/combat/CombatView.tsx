import CombatField from "./CombatField";
import React from "react";
import {Link} from "react-router-dom";
import Participants from "./Participants";
import Menu from "./Menu";

const CombatView = () => {
    return (
        <div style={styles.combatViewWrapper}>
            <div style={styles.header}>
                <h3>This is the header</h3>
                <Link to={"/home"}>Back to home</Link>
            </div>

            <div style={styles.participantsContainer}>
                <Participants />
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
    header: {
        gridArea: "header",
        gridColumn: "1/10",
        gridRow: "1/2",
        border: "2px solid gray",
        background: "#eee"
    },
    participantsContainer: {
        gridColumn: "1/2",
        gridRow: "2/8",
        border: "2px solid gray",
        background: "#eee",
    },
    gridContainer: {
        gridColumn: "2/8",
        gridRow: "2/8",
        border: "2px solid gray",
        background: "#eee"
    },
    sideBar: {
        gridColumn: "8/10",
        gridRow: "2/8",
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