import firebase from "firebase";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Grid from "./Grid";
import GridSizeForm from "./GridSizeForm";
import { UserSearch } from "../user/UserSearch";
import UserInfo from "../user/UserInfo";
import UserReference from "../user/UserReference";

//TODO move component to a different directory, "combat" should only handle the combat itself

export const NewCombatField = () => {
  const combatfields = firebase.firestore().collection("combatfields");
  const users = firebase.firestore().collection("users");

  const auth = useContext(FirebaseContext)!.auth;
  const [user, initializing, authError] = useAuthState(auth);

  const [gridSize, setGridSize] = useState<number>(100);
  const [players, setPlayers] = useState<UserInfo[]>([]);

  //TODO get the correct type for this event
  const createNewCombatfield = (event: any) => {
    event.preventDefault();

    let combatfieldName = event.target.combatfieldName.value;
    console.log(`trying to add ${combatfieldName} to db`);

    let playerIDs = players.map(player => player.uid) as string[];

    // save grid with userID
    let grid = new Grid(combatfieldName, gridSize, playerIDs);
    let gridId = combatfields.doc().id;
    combatfields.doc(gridId).set(Object.assign({}, grid));

    // save gridId to user
    let userRecord = users.doc(user!.uid);
    userRecord.collection("combatfields").add({ gridId });
  };

  const saveSize = (event: any, value: number | number[]) => {
    let size = value as number;
    setGridSize(size * 10);
  };

  const addPlayer = (player: UserInfo) => {
    if (!players.includes(player)) {
      let newPlayerList = [...players, player] as UserInfo[];
      setPlayers(newPlayerList);
    }
  };

  useEffect(() => {
    let currentUser = new UserInfo(user!.uid as string, "You");
    setPlayers([currentUser]);
  }, []);

  return (
    <div style={{ width: 400, height: 400 }}>
      <GridSizeForm onSubmit={createNewCombatfield} saveSize={saveSize} />

      <h2>Add players to your combat field!</h2>
      <UserSearch onAddPlayer={addPlayer} />

      <br />
      <div>
        <h3>Added players:</h3>
        {players
          ? players.map((player: UserInfo) => (
              <UserReference key={player.uid!} userData={player} />
            ))
          : "No players added"}
      </div>
    </div>
  );
};
