import React, { useContext, useState } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import Grid from "../../model/Grid";
import GridSizeForm from "./GridSizeForm";
import { useAuthState } from "react-firebase-hooks/auth";
import {ModalContext} from "../../wrappers/ModalWrapper";

const NewCombatfield = (props: any) => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const { hideModal } = useContext(ModalContext)!;

    const [gridSize, setGridSize] = useState<number>(100);
    const campaignId = props.campaignId;

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    const createNewCombatfield = async (event: any) => {
        event.preventDefault();

        //TODO handle empty combatfield names and duplicates

        let combatfieldName = event.target.combatfieldName.value;
        let grid = new Grid(combatfieldName, user!.uid, gridSize);

        let combatfieldsCol = await campaignsRef
            .doc(campaignId)
            .collection("combatfields");

        let combatfieldId = combatfieldsCol.doc().id;
        combatfieldsCol.doc(combatfieldId).set(Object.assign({}, grid));
        hideModal();
    };

    const saveSize = (event: any, value: number | number[]) => {
        let size = value as number;
        setGridSize(size * 10);
    };

    return (
        <GridSizeForm onSubmit={createNewCombatfield} saveSize={saveSize} />
    );
};

export default NewCombatfield;
