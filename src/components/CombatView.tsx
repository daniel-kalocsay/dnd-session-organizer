import CombatField from "./CombatField";
import ColorTest from "./ColorTest";
import React from "react";
import {Link} from "react-router-dom";

const CombatView = () => {
    return (
        <div style={styles.combatViewWrapper}>
            <div style={styles.header}>
                <h3>This is the header</h3>
                <Link to={"/home"}>Back to home</Link>
            </div>

            <div style={styles.playersContainer}>
                <h4>The players are here</h4>
                <div style={styles.player}>Dungeon Master</div>
                <div style={styles.player}>Player 1</div>
                <div style={styles.player}>Player 2</div>
                <div style={styles.player}>Player 3</div>
                <div style={styles.player}>Player 4</div>
            </div>

            <div style={styles.gridContainer}>
                <CombatField />
            </div>

            <div style={styles.sideBar}>This is the sidebar</div>

            <div style={styles.menuContainer}>
                <div>menuitem 1</div>
                <div>menuitem 2</div>
                <ColorTest />
                <div>menu item 4</div>
            </div>
        </div>
    )
};

export default CombatView;

const styles = {
    combatViewWrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
        gridGap: "1em",
        // margin: "1em",
        // gridAutoRows: "minmax(100px, auto)",
        // gridAutoColumns: "minmax(100px, auto)",
        width: "95vw",
        height: "95vh"
    },
    header: {
        gridArea: "header",
        gridColumn: "1/6",
        gridRow: "1/2",
        border: "2px solid gray",
        background: "#eee"
    },
    playersContainer: {
        gridColumn: "1/2",
        gridRows: "2/5",
        border: "2px solid gray",
        background: "#eee"
    },
    gridContainer: {
        gridColumn: "2/5",
        gridRow: "2/5",
        border: "2px solid gray",
        background: "#eee"
    },
    sideBar: {
        gridColumn: "5/6",
        gridRow: "2/5",
        border: "2px solid gray",
        background: "#eee"
    },
    menuContainer: {
        gridColumn: "1/6",
        gridRow: "5/6",
        border: "2px solid gray",
        background: "#eee",
        display: "grid",
    },
    player: {
        border: "2px solid gray"
    }
};