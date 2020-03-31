import firebase from "firebase";
import React, {ChangeEvent, useContext, useState} from "react";
import {FirebaseContext} from "../contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";
import Grid from "./Grid";
import GridSizeForm from "./GridSizeForm";

//TODO move component to a different directory, "combat" should only handle the combat itself

export const NewCombatField = () => {
    const combatfields = firebase
        .firestore()
        .collection("combatfields");
    const users = firebase.firestore().collection("users");

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    const [gridSize, setGridSize] = useState<number>(100);

    //TODO get the correct type for this event
    const createNewCombatfield = (event: any) => {
        event.preventDefault();

        let combatfieldName = event.target.combatfieldName.value;
        console.log(`trying to add ${combatfieldName} to db`);

        // save grid with userID
        let grid = new Grid(combatfieldName, gridSize, [user!.uid]);
        let gridId = combatfields.doc().id;
        combatfields.doc(gridId).set(Object.assign({}, grid));

        // save gridId to user
        let userRecord = users.doc(user!.uid);
        userRecord.collection("combatfields").add({gridId});

    };

    const saveSize = (event: any, value: number | number[]) => {
        let size = value as number;
        setGridSize(size * 10);
    };


    return (
        <div style={{width:400, height: 400}} >

            <GridSizeForm
                onSubmit={createNewCombatfield}
                saveSize={saveSize}
            />

        </div>
    );
};
