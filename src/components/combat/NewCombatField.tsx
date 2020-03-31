import firebase from "firebase";
import React, {ChangeEvent, useContext, useState} from "react";
import {FirebaseContext} from "../contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";
import Grid from "./Grid";
import {FormControl, TextField, Button, Typography, Slider} from "@material-ui/core";

//TODO move component to a different directory, "combat" should only handle the combat itself

export const NewCombatField = () => {
    const combatfields = firebase
        .firestore()
        .collection("combatfields");
    const users = firebase.firestore().collection("users");

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    const [gridSize, setGridSize] = useState<number>(0);

    //TODO get the correct type for this event
    const createNewCombatfield = (event: any) => {
        event.preventDefault();
        let combatfieldName = event.target.combatfieldName.value;

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

    const marks = [
        {
            value: 10,
            label: "10x10",
        },
        {
            value: 40,
            label: "20x20",
        },
        {
            value: 90,
            label: "30x30",
        },
    ];

    function valuetext(value: number) {
        return `${value}x${value}`;
    }

    function valueLabelFormat(value: number) {
        let index = marks.findIndex((mark) => mark.value === value) + 1;
        return Math.pow(index, 2) * 100;
    }

    return (
        <div style={{width:500}}>
            <form onSubmit={createNewCombatfield}>
                <FormControl>
                    <TextField variant={"outlined"} name='combatfieldName'/>
                    <Button type={"submit"} variant={"outlined"}>Create New Combatfield</Button>
                </FormControl>
            </form>
            <Typography id="discrete-slider-restrict" gutterBottom>
                Choose the grid size of your combat field
            </Typography>
            <Slider
                defaultValue={10}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                onChangeCommitted={saveSize}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </div>
    );
};
