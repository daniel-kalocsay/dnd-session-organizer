import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Grid from "../../model/Grid";
import UserInfo from "../../model/UserInfo";
import GridSizeForm from "./GridSizeForm";
import UserSearch from "../user/UserSearch";
import UserReference from "../user/UserReference";

type QuerySnapshot = firebase.firestore.QuerySnapshot;

//TODO move component to a different directory, "combat" should only handle the combat itself

const NewCombatfield = (props: any) => {
    //const combatfields = useContext(FirebaseContext)!.combatfieldsRef;
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const users = useContext(FirebaseContext)!.usersRef;

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    const [gridSize, setGridSize] = useState<number>(100);
    const [players, setPlayers] = useState<UserInfo[]>([]);

    const createNewCombatfield = async (event: any) => {
        //event.preventDefault();

        let combatfieldName = event.target.combatfieldName.value;
        let grid = new Grid(combatfieldName, gridSize);
        let combatfieldsCol = await campaignsRef
            .doc(props.campaignId)
            .collection("combatfields");

        let combatfieldId = combatfieldsCol.doc().id;
        combatfieldsCol.doc(combatfieldId).set(Object.assign({}, grid));
    };

    const saveSize = (event: any, value: number | number[]) => {
        let size = value as number;
        setGridSize(size * 10);
    };

    useEffect(() => {
        let currentUser = new UserInfo(user!.uid as string, "You");
        setPlayers([currentUser]);
    }, []);

    return (
        <div style={{ width: 400, height: 400 }}>
            <GridSizeForm onSubmit={createNewCombatfield} saveSize={saveSize} />
        </div>
    );
};

export default NewCombatfield;
