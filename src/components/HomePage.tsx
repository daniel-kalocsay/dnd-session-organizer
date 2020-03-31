import React from "react";
import { NewCombatField } from "./combat/NewCombatField"
import { CombatfieldList } from "./CombatfieldList";

const HomePage = () => {
    return (
        <div>
            <h2>Hello world!</h2>
            <h5>This is our in-progress home page!</h5>
            <h5>Check the combat grid by selecting it from the navbar!</h5>
            <NewCombatField/>
            <CombatfieldList/>
        </div>
    )
};

export default HomePage;