import React, {useState, useContext} from "react";
import firebase from "firebase";
import {FirebaseContext} from "../contexts/FirebaseContext";
import UserInfo from "../../model/UserInfo";
import UserList from "./UserList";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

const UserSearch = (props: any) => {
    const usersDB = useContext(FirebaseContext)!.usersRef;
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

    const searchUser = async(username: string) => {
        let usersFound = [] as UserInfo[];

        let queriedUsers:QuerySnapshot = await
            usersDB
            .orderBy("username")
            .startAt(username)
            .endAt(`${username}\uf8ff`)
            .get();

        queriedUsers.forEach((user: QueryDocumentSnapshot) => {
            let uid = user.id;
            let username = user.data().username;
            let data = new UserInfo(uid, username);
            usersFound.push(data);
        });

        setUsers(usersFound);
    };

    return (
        <div>
            <input placeholder={"Username"} onChange={handleChange}/>
            <div>
                <UserList onUserClick={props.onAddPlayer} users={users}/>
            </div>
        </div>
    );
};

export default UserSearch;
