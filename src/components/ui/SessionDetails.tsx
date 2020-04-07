import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import CombatfieldData from "../../model/CombatfieldData";
import CombatfieldList from "../combat/CombatfieldList";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

const SessionDetails = (props: any) => {
  const combatfieldsRef = firebase.firestore().collection("combatfields");
  const sessionsRef = firebase.firestore().collection("sessions");

  const auth = useContext(FirebaseContext)!.auth;
  const [user, initializing, authError] = useAuthState(auth);
  const [combatfieldData, setCombatfieldData] = useState(
    [] as CombatfieldData[]
  );

  useEffect(() => {
    if (user) {
      fetchCombatfields();
    }
  }, [user]);

  const fetchCombatfields = () => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("id");

    sessionsRef
      .doc(sessionId!)
      .collection("combatfields")
      .get()
      .then(function (querySnapshot: QuerySnapshot) {
        querySnapshot.forEach((data: DocumentSnapshot) => {
          combatfieldsRef
            .doc(data.id)
            .get()
            .then((combatfieldRecord: DocumentSnapshot) => {
              if (combatfieldRecord.exists) {
                let entry = combatfieldRecord.data();
                console.log(entry);

                let data = new CombatfieldData(
                  entry!.name,
                  combatfieldRecord.id
                );
                setCombatfieldData((oldData) => [...oldData, data]);
              }
            });
        });
      });
  };

  return (
    <div>
      <CombatfieldList combatfields={combatfieldData} />
    </div>
  );
};

export default SessionDetails;
