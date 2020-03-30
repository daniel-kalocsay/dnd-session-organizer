import firebase from "firebase";
import React, { useContext } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Grid from "./Grid";

export const NewCombatField = () => {
  const combatfields = firebase
    .firestore()
    .collection("combatfields");
  const users = firebase.firestore().collection("users");

  const auth = useContext(FirebaseContext)!.auth;
  const [user, initializing, authError] = useAuthState(auth);

  const createNewCombatfield = () => {

    // save grid with userID
    let grid = new Grid(100, [user!.uid]);
    let gridId = combatfields.doc().id;
    combatfields.doc(gridId).set(Object.assign({}, grid));

    // save gridId to user
    let userRecord = users.doc(user!.uid);
    userRecord.collection("combatfields").add({ gridId });
  };

  return (
    <div>
      <button onClick={createNewCombatfield}></button>
    </div>
  );
};
