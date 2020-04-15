import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import CombatfieldData from "../../model/CombatfieldData";
import CombatfieldList from "../combat/CombatfieldList";
import UserSearch from "../user/UserSearch";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

const SessionDetails = (props: any) => {
  const combatfieldsRef = useContext(FirebaseContext)!.combatfieldsRef;
  const sessionsRef = useContext(FirebaseContext)!.sessionsRef;
  const usersRef = useContext(FirebaseContext)!.usersRef;

  const [sessionId, setId] = useState("" as string);
  const [combatfieldData, setCombatfieldData] = useState(
    [] as CombatfieldData[]
  );
  const [players, setPlayers] = useState([] as any[]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("id");
    setId(sessionId!);
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchCombatfields();
      fetchPlayers();
    }
  }, [sessionId]);

  const fetchCombatfields = () => {
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

  const fetchPlayers = () => {
    sessionsRef
      .doc(sessionId)
      .collection("players")
      .get()
      .then(function (querySnapshot: QuerySnapshot) {
        querySnapshot.forEach((player: DocumentSnapshot) => {
          usersRef
            .doc(player.id)
            .get()
            .then((userRecord: DocumentSnapshot) => {
              setPlayers((oldData) => [
                ...oldData,
                userRecord.data()!.username,
              ]);
            });
        });
      });
  };

  const addPlayer = (userData: any) => {
    let userId = userData!.uid;

    usersRef.doc(userId).collection("sessions").doc(sessionId).set({});
    sessionsRef.doc(sessionId).collection("players").doc(userId).set({});
  };

  return (
    <div>
      <CombatfieldList combatfields={combatfieldData} />
      <h3>Add player to session:</h3>
      <UserSearch onAddPlayer={addPlayer} />
      <h3>Players in the session:</h3>
      {players.map((player) => (
        <p>{player}</p>
      ))}
    </div>
  );
};

export default SessionDetails;
