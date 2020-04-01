import React, {useState} from "react";
import UserReference from './UserReference';
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

export const UserSearch = (props: any) => {
    const usersDB = firebase.firestore().collection("users");
    const [users, setUsers] = useState([] as UserInfo[]);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        let searchValue = event.currentTarget.value;

        // clear results if value is empty, query new results otherwise
        if (searchValue === "") {
            setUsers([]);
        } else {
            searchUser(searchValue);
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
                    let uid = user.id;
                    let username = user.data().username;
                    let data = new UserInfo(uid, username);
                    usersFound.push(data)
                });
                setUsers(usersFound);
            });
    };

    return (
        <div>
            <input onChange={handleChange} placeholder={"Username"}/>
            <div>
                {users ? users.map(user =>
                    <UserReference key={user.uid}
                                   userData={user}
                                   onAddPlayer={props.onAddPlayer}
                    />
                    ) : ""}
            </div>
        </div>
    );
};
