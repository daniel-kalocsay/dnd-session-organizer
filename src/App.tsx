import React from "react";
import CombatView from "./components/ui/CombatView";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import { FirebaseProvider } from "./components/contexts/FirebaseContext";
import { UserProvider } from "./components/contexts/UserContext";

function App() {
  return (
    <div className="App" style={styles.appWrapper}>
      <FirebaseProvider>
        <UserProvider>
          <Router>
            <Navbar />

            <Route exact path={"/"}>
              <Redirect to={"/home"} />
            </Route>

            <Route path={"/home"}>
              <div>home</div>
            </Route>

            <Switch>
              <Route exact path={"/combat"}>
                <CombatView />
              </Route>
            </Switch>
          </Router>
        </UserProvider>
      </FirebaseProvider>
    </div>
  );
}

export default App;

const styles = {
  appWrapper: {
    display: "grid",
    width: "95vw",
    height: "95vh",
    margin: "1em"
  }
};
