import React from "react";

import CombatfieldData from "../../model/CombatfieldData";

const CombatfieldList = (props: any) => {
  return (
    <div id="combatfield-list">
      {props.combatfields
        ? props.combatfields.map((combatfield: CombatfieldData) => (
            <p key={combatfield.uid}>{combatfield.name}</p>
          ))
        : ""}
    </div>
  );
};

export default CombatfieldList;