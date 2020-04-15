import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import CombatfieldData from "../../model/CombatfieldData";
import CombatfieldList from "../combat/CombatfieldList";
import UserSearch from "../user/UserSearch";
import UserInfo from "../../model/UserInfo";
import Button from "@material-ui/core/Button";

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
  const [players, setPlayers] = useState([] as UserInfo[]);

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
      .onSnapshot(function (querySnapshot: QuerySnapshot) {
        setPlayers([]);
        querySnapshot.forEach((player: DocumentSnapshot) => {
          usersRef
            .doc(player.id)
            .get()
            .then((userRecord: DocumentSnapshot) => {
              let userInfo = new UserInfo(
                player.id,
                userRecord.data()!.username
              );
              setPlayers((oldData) => [...oldData, userInfo] as UserInfo[]);
            });
        });
      });
  };

  const addPlayer = (userData: UserInfo) => {
    let userId = userData!.uid;

    usersRef.doc(userId!).collection("sessions").doc(sessionId).set({});
    sessionsRef.doc(sessionId).collection("players").doc(userId!).set({});
  };

  const deleteUser = (userId: string) => {
    sessionsRef.doc(sessionId).collection("players").doc(userId).delete();
    usersRef.doc(userId).collection("sessions").doc(sessionId).delete();
  };

  return (
    <div>
      <h2>{sessionId}</h2>
      <CombatfieldList combatfields={combatfieldData} />
      <h3>Add player to session:</h3>
      <UserSearch onAddPlayer={addPlayer} />
      <h3>Players in the session:</h3>
      {players.map((player: UserInfo) => (
        <div key={player.uid!}>
          <p>{player.name}</p>
          <Button
            onClick={() => {
              deleteUser(player.uid!);
            }}
          >
            Remove user from session
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SessionDetails;
