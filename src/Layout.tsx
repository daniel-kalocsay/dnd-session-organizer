import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Navbar from "./components/ui/Navbar";
import HomePage from "./components/HomePage";
import WithAuth from "./wrappers/WithAuth";
import NewCombatfield from "./components/combat/NewCombatfield";
import CombatfieldList from "./components/combat/CombatfieldList";
import SessionList from "./components/ui/SessionList";

const Layout = () => {
  return (
    <Router>
      <div style={styles.appWrapper}>
        <div style={styles.navBar}>
          <Navbar />
        </div>

        <div style={styles.page}>
          <Route exact path={"/"}>
            <Redirect to={"/home"} />
          </Route>

          <Route path={"/home"}>
            <HomePage />
          </Route>

          <Route exact path={"/combat"}>
            <WithAuth
              loadingMsg={"Loading combatfields..."}
              unauthorizedMsg={"Log in to access your combatfields"}
            >
              <CombatfieldList />
            </WithAuth>
          </Route>

          <Route exact path={"/my-sessions"}>
            <WithAuth
              loadingMsg={"Loading sessions..."}
              unauthorizedMsg={"Log in to access your sessions"}
            >
              <SessionList />
            </WithAuth>
          </Route>

          <Route path={"/new-combat-field"}>
            <WithAuth
              unauthorizedMsg={
                "You need to be logged in to create a new combatfield"
              }
            >
              <NewCombatfield />
            </WithAuth>
          </Route>
        </div>
      </div>
    </Router>
  );
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
