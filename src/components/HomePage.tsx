import React from "react";
import { NewCombatField } from "./combat/NewCombatField"

const HomePage = () => {
    return (
        <div>
            <h2>Hello world!</h2>
            <h5>This is our in-progress home page!</h5>
            <h5>Check the combat grid by selecting it from the navbar!</h5>
            <NewCombatField/>
        </div>
    )
};

export default HomePage;