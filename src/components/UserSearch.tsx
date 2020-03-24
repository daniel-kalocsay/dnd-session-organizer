import React, { useContext, useState } from "react";
import { FirebaseContext } from "./contexts/FirebaseContext";
import { DataSnapshot } from "@firebase/database-types";

export const UserSearch = () => {
  const db = useContext(FirebaseContext)!.database;
  const [users, setUsers] = useState([] as any[]);

  const searchUser = (event: React.FormEvent<HTMLInputElement>) => {
    setUsers([]);
    db.child("users")
      .orderByChild("username")
      .startAt([event.currentTarget.value].toString())
      .endAt(`${[event.currentTarget.value].toString()}\uf8ff`)
      .once("value", (snapshot: DataSnapshot) => {
        snapshot.forEach((user: DataSnapshot) => {
          let username = user.val().username.toString();
          console.log(username)
          //setUsers([...users, username]);
        });
        // let dunno = snapshot.val()
        // console.log('kereses');
      });
  };

  return (
    <div>
      <input onChange={searchUser}></input>
      {users ? users.map(user => <p>{user}</p>) : ""}
    </div>
  );
};
