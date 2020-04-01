import React, {useContext, useState} from "react";
import {UserReference} from './UserReference';
import firebase from "firebase";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

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
    const usersDB = firebase.firestore().collection("users");
    const [users, setUsers] = useState([] as UserInfo[]);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === "") {
            setUsers([]);
        } else {
            searchUser(event.currentTarget.value)
        }
    };

    const searchUser = (username: string) => {
        let usersFound = [] as UserInfo[];
        
        usersDB
            .orderBy("username")
            .startAt(username)
            .endAt(`${username}\uf8ff`)
            .get()
            .then((snapshot: QuerySnapshot) => {
                snapshot.forEach((user: QueryDocumentSnapshot) => {
                    let username = user.data().username.toString();
                    let uid = user.id;
                    let data = new UserInfo(uid, username);
                    usersFound.push(data)
                });
                setUsers(usersFound);
            })
    };

    return (
        <div>
            <input onChange={handleChange} placeholder={"Username"}/>
            {users ? users.map(user => <UserReference userData={user}/>) : ""}
        </div>
    );
};
