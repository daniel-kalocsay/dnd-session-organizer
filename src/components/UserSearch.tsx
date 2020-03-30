import React, { useContext, useState } from "react";
import { FirebaseContext } from "./contexts/FirebaseContext";
import { UserReference } from './UserReference';

type DataSnapshot = firebase.database.DataSnapshot;

export class UserInfo {
  uid: string | null;
  name: string;

  constructor(uid: string | null, name: string) {
    this.name = name;
    this.uid = uid;
  }
}

//TODO use firestore instead
export const UserSearch = () => {
  const db = useContext(FirebaseContext)!.database.ref();
  const [users, setUsers] = useState([] as UserInfo[]);

  const searchUser = (event: React.FormEvent<HTMLInputElement>) => {
    let usersFound = [] as UserInfo[];
    db.child("users")
      .orderByChild("username")
      .startAt([event.currentTarget.value].toString())
      .endAt(`${[event.currentTarget.value].toString()}\uf8ff`)
      .once("value", (snapshot: DataSnapshot) => {
        snapshot.forEach((user: DataSnapshot) => {
          let username = user.val().username.toString();
          let uid = user.key;
          let data = new UserInfo(uid, username);
          usersFound.push(data);
        });
        setUsers(usersFound);
      });
  };

  return (
    <div>
      <input onChange={searchUser}></input>
      {users ? users.map(user => <UserReference userData={user} />) : ""}
    </div>
  );
};
