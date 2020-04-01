import React, {useContext} from "react";
import Navbar from "./components/ui/Navbar";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import CombatView from "./components/ui/CombatView";
import { UserSearch } from "./components/UserSearch";
import WithAuth from "./helpers/WithAuth";
import {NewCombatField} from "./components/combat/NewCombatField";

const Layout = () => {

    return (
        <Router>
            <div style={styles.appWrapper}>
                <div style={styles.navBar}>
                    <Navbar/>
                </div>

                <div style={styles.page}>
                    <Route exact path={"/"}>
                        <Redirect to={"/home"}/>
                    </Route>

                    <Route path={"/home"}>
                        <HomePage/>
                    </Route>

                    <Route exact path={"/combat"}>

                        <WithAuth loadingMsg={"Loading combat view..."}
                                  unauthorizedMsg={"You cannot access this grid."}
                        >
                            <CombatView />
                        </WithAuth>

                    </Route>

                    <Route path={"/new-combat-field"}>
                        <WithAuth unauthorizedMsg={"You need to be logged in to create a new combat field"}>
                            <NewCombatField />
                        </WithAuth>
                    </Route>

                </div>
            </div>
        </Router>
    )
};

export default Layout;

const styles = {
    appWrapper: {
        display: "grid",
        gridTemplate: "repeat(auto-fit, 1fr)",
        gridGap: "1em"
    },
    navBar: {
        gridRow: "1/2"
    },
    page: {
        gridRow: "2/10"
    }
};