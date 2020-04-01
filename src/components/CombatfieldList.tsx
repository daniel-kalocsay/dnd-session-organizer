import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { FirebaseContext } from "./contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

class CombatfieldData {
  name: string;
  uid: string;

  constructor(name: string, uid: string) {
    this.name = name;
    this.uid = uid;
  }
}

export const CombatfieldList = () => {
  const combatfieldsRef = firebase.firestore().collection("combatfields");

  const [combatfieldData, setCombatfieldData] = useState(
    [] as CombatfieldData[]
  );
  const usersRef = firebase.firestore().collection("users");

  const auth = useContext(FirebaseContext)!.auth;
  const [user, initializing, authError] = useAuthState(auth);

  useEffect(() => {
    let ids = [] as string[];
    let combatfieldsTemp = [] as CombatfieldData[];

    if (user) {
      usersRef
        .doc(user!.uid)
        .collection("combatfields")
        .get()
        .then(function(querySnapshot: QuerySnapshot) {
          querySnapshot.forEach((data: DocumentSnapshot) => {
            let entry = data.data();
            ids.push(entry!.gridId);
          });
          ids.forEach((id: string) => {
            combatfieldsRef
              .doc(id)
              .get()
              .then((combatfieldRecord: DocumentSnapshot) => {
                if (combatfieldRecord.exists) {
                  let record = combatfieldRecord.data();
                  let data = new CombatfieldData(
                    record!.name,
                    combatfieldRecord.id
                  );
                  combatfieldsTemp.push(Object.assign({}, data));
                }
              });
          });
          setCombatfieldData(combatfieldData => [...combatfieldsTemp]);
        })
    }
  }, [user]);

  useEffect(() => {
    console.log(combatfieldData)
  }, [combatfieldData])

  return (
    <div id="combatfield-list">
      {combatfieldData
        ? combatfieldData.map(combatfield => <p>{combatfield.name}</p>)
        : ""}
    </div>
  );
};
