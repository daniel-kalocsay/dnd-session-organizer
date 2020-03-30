import React, { useContext, useState } from "react";
import { FirebaseContext } from "./contexts/FirebaseContext";
type DataSnapshot = firebase.database.DataSnapshot

//TODO use firestore instead
export const UserSearch = () => {
  const db = useContext(FirebaseContext)!.database.ref();
  const [users, setUsers] = useState([] as any[]);

  const searchUser = (event: React.FormEvent<HTMLInputElement>) => {
    let usersFound = [] as any[];
    db.child("users")
      .orderByChild("username")
      .startAt([event.currentTarget.value].toString())
      .endAt(`${[event.currentTarget.value].toString()}\uf8ff`)
      .once("value", (snapshot: DataSnapshot) => {
        snapshot.forEach((user: DataSnapshot) => {
          let username = user.val().username.toString();
          usersFound.push(username);
        });
        setUsers(usersFound);
      });
  };

  return (
    <div>
      <input onChange={searchUser}></input>
      {users ? users.map(user => <p>{user}</p>) : ""}
    </div>
  );
};
