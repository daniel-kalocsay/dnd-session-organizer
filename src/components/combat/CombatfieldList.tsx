import React from "react";
import {Link} from "react-router-dom";

import CombatfieldData from "../../model/CombatfieldData";

interface CombatFieldListProps {
    combatfields: CombatfieldData[]
}

const CombatfieldList = (props: CombatFieldListProps) => {
    return (
        <div id="combatfield-list">
            <h2>Combatfields:</h2>
            {props.combatfields ? props.combatfields.map((combatfield: CombatfieldData) => (
                <div>
                    <Link to={`/combat?id=${combatfield.uid}`} key={combatfield.uid}>{combatfield.name}</Link>
                    <br/>
                </div>
            )) : ""}
        </div>
    );
};

export default CombatfieldList;
