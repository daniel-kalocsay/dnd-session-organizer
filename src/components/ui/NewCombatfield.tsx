import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { FirebaseContext } from "../contexts/FirebaseContext";
import Grid from "../../model/Grid";
import GridSizeForm from "./GridSizeForm";

//TODO move component to a different directory, "combat" should only handle the combat itself

const NewCombatfield = (props: any) => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const [gridSize, setGridSize] = useState<number>(100);
    const state = useLocation().state as any;

    const createNewCombatfield = async (event: any) => {
        event.preventDefault();

        let combatfieldName = event.target.combatfieldName.value;
        let grid = new Grid(combatfieldName, gridSize);
        let combatfieldsCol = await campaignsRef
            .doc(state.campaignId)
            .collection("combatfields");

        let combatfieldId = combatfieldsCol.doc().id;
        combatfieldsCol.doc(combatfieldId).set(Object.assign({}, grid));
    };

    const saveSize = (event: any, value: number | number[]) => {
        let size = value as number;
        setGridSize(size * 10);
    };

    return (
        <div style={{ width: 400, height: 400 }}>
            <GridSizeForm onSubmit={createNewCombatfield} saveSize={saveSize} />
        </div>
    );
};

export default NewCombatfield;
