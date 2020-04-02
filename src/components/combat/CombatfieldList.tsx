import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import CombatfieldData from "../../model/CombatfieldData";

export const CombatfieldList = (props: any) => {
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
