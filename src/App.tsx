import React from 'react';
import CombatView from "./components/CombatView";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import HomePage from "./components/HomePage";


function App() {

    return (
        <div className="App" style={styles.appWrapper}>

            <Router>
                <Redirect to={"/home"} />

                <Route path={"/home"}>
                    <HomePage />
                </Route>

                <Switch>
                    <Route exact path={"/combat"}>
                        <CombatView/>
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
