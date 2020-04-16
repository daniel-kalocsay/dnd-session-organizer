import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Navbar from "./components/ui/Navbar";
import HomePage from "./components/HomePage";
import WithAuth from "./wrappers/WithAuth";
import NewCampaign from "./components/ui/NewCampaign";
import CampaignList from "./components/ui/CampaignList";
import CombatView from "./components/ui/CombatView";
import CampaignDetails from "./components/ui/CampaignDetails";

const Layout = () => {
  //TODO use react-swipeable views?
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
              <CombatView />
            </WithAuth>
          </Route>

          <Route exact path={"/my-campaigns"}>
            <WithAuth
              loadingMsg={"Loading campaigns..."}
              unauthorizedMsg={"Log in to access your campaigns"}
            >
              <CampaignList />
            </WithAuth>
          </Route>

          <Route exact path={"/campaign"}>
            <WithAuth
              loadingMsg={"Loading campaign details..."}
              unauthorizedMsg={"Log in to continue"}
            >
              <CampaignDetails />
            </WithAuth>
          </Route>

          <Route path={"/new-campaign"}>
            <WithAuth
              unauthorizedMsg={
                "You need to be logged in to create a new campaign"
              }
            >
              <NewCampaign />
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
    gridGap: "1em",
  },
  navBar: {
    gridRow: "1/2",
  },
  page: {
    gridRow: "2/10",
  },
};
