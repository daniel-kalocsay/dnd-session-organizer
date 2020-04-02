import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import CombatfieldData from "../../model/CombatfieldData";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export const CombatfieldList = (props: any) => {
  // const combatfieldsRef = firebase.firestore().collection("combatfields");

  // const [combatfieldData, setCombatfieldData] = useState(
  //   [] as CombatfieldData[]
  // );
  // const usersRef = firebase.firestore().collection("users");

  // const auth = useContext(FirebaseContext)!.auth;
  // const [user, initializing, authError] = useAuthState(auth);

  // useEffect(() => {
  //   if (user) {
  //     usersRef
  //       .doc(user!.uid)
  //       .collection("combatfields")
  //       .get()
  //       .then(function(querySnapshot: QuerySnapshot) {
  //         querySnapshot.forEach((data: DocumentSnapshot) => {
  //           let entry = data.data();
  //           combatfieldsRef
  //             .doc(entry!.gridId)
  //             .get()
  //             .then((combatfieldRecord: DocumentSnapshot) => {
  //               if (combatfieldRecord.exists) {
  //                 let entry = combatfieldRecord.data();
  //                 let data = new CombatfieldData(
  //                   entry!.name,
  //                   combatfieldRecord.id
  //                 );
  //                 setCombatfieldData(oldData => [...oldData, data]);
  //               }
  //             });
  //         });
  //       });
  //   }
  // }, [user]);

  return (
    <div id="combatfield-list">
      {props.combatfields.map((combatfield: CombatfieldData) => (
        <p key={combatfield.uid}>{combatfield.name}</p>
      ))}
    </div>
  );
};
