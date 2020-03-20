import React from "react";
import CombatView from "./components/CombatView";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Registration from "./components/user/Registration";
import Logout from "./components/user/Logout";
import Login from "./components/user/Login";


function App() {
  return (
    <div className="App" style={styles.appWrapper}>
      <Router>
        <Route exact path={"/"}>
          <Redirect to={"/home"} />
        </Route>

        <Route path={"/home"}>
          <HomePage />
          <Registration/>
          <Login/>
          <Logout/>
        </Route>

        <Switch>
          <Route exact path={"/combat"}>
            <CombatView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

const styles = {
  appWrapper: {
    display: "grid",
    // width: "95vw",
    // height: "95vh",
    margin: "1em"
  }
};
