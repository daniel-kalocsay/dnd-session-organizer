import React from "react";
import { Link } from "react-router-dom";

import CombatfieldData from "../../model/CombatfieldData";

const CombatfieldList = (props: any) => {
  return (
    <div id="combatfield-list">
      <p>Combatfields:</p>
      {props.combatfields
        ? props.combatfields.map((combatfield: CombatfieldData) => (
            <Link to="/combat" key={combatfield.uid}>
              {combatfield.name}
            </Link>
          ))
        : ""}
    </div>
  );
};

export default CombatfieldList;
