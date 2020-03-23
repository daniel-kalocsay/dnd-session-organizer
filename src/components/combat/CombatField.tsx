import React, {useState, useEffect, useContext} from "react";
import Square from "./Square";
import {DataSnapshot} from "@firebase/database-types";
import { FirebaseContext } from "../contexts/FirebaseContext";

const CombatField = () => {
    const [squares, setSquares] = useState([] as any[]);

    const firebase = useContext(FirebaseContext);

    const grids = firebase?.database
        .child("grids");

    const grid1 = grids.child("grid1");
    const myGrid = grids.child("-M2sG9eGGqRaBHZAHDnl");

    const tiles = grids.child("grid1").child("tiles");

    const movePlayer = (id: any) => {
        let newSquares = squares.map(square => {
            return {active: square.id === id};
        });

        tiles.set(newSquares);

        //TODO use these to store individual grids in db

        // grids.push({tiles: newSquares}) // saves grid in db under "grids" node and generates key for it
        // myGrid.set({tiles: newSquares}); // sets data in a node
    };

    const updateSquares = () => {
        tiles.on("value", (snapshot: DataSnapshot) => {

            let tiles = snapshot.val();
            let updatedSquares = [];

            for (let id in tiles) {

                let active = tiles[id].active;
                let square = {id: Number(id), active: active};

                updatedSquares.push(square)
            }

            setSquares(updatedSquares);
        });
    };

    useEffect(() => {
        updateSquares();
    }, []);

    return (
        <div style={styles.grid}>
            {squares
                ? squares.map(square =>
                    <div style={square.active ? styles.active : styles.inactive} onClick={ () => movePlayer(square.id) }>
                        <Square square={square} />
                    </div>
                    )
                : null}
        </div>
    );
};

export default CombatField;

const styles = {
    grid: {
        display: "grid",
        gridTemplateRows: "repeat(auto-fill, 1fr)",
        gridTemplateColumns: "repeat(5, 1fr)",
        backgroundColor: "lightgreen",
        //TODO don't use this magic number
        height: "30em"
    },
    tile: {
        //TODO resolve styling of tyles, use active/inactive to change color
    },
    active: {
        border: "2px solid black",
        backgroundColor: "red"
    },
    inactive: {
        border: "2px solid black",
        backgroundColor: "lightgreen"
    }
};
