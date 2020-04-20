import React from "react";

import CombatGrid from "../combat/CombatGrid";
import Players from "../combat/Players";
import Menu from "../combat/Menu";
import {Link, useLocation} from "react-router-dom";
import UserInfo from "../../model/UserInfo";

const CombatView = (props: any) => {

    const params = new URLSearchParams(window.location.search);
    const state = useLocation().state as any;
    const combatfieldData = state.combatfieldData;
    const players = state.players as UserInfo[];

    console.log(combatfieldData);
    console.log(players);

    return (
        <div style={styles.combatViewWrapper}>
            <div style={styles.playersContainer}>
                <Players players={players} />
            </div>

            <div style={styles.gridContainer}>
                <CombatGrid gridId={combatfieldData.uid} />
            </div>

            <div style={styles.sideBar}>
                <div>This is the sidebar</div>
            </div>

            <div style={styles.menuContainer}>
                <Menu />
            </div>
        </div>
    );
};

export default CombatView;

const styles = {
    combatViewWrapper: {
        display: "grid",
        gridTemplate: "repeat(auto-fit, 1fr)",
        gridGap: "1em"
        // margin: "1em",
        // width: "95vw",
        // height: "95vh",
    },
    playersContainer: {
        gridColumn: "1/2",
        gridRow: "1/8",
        border: "2px solid gray",
        background: "#eee"
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
        background: "#eee"
    }
};
