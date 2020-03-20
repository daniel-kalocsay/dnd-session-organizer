import React, {useState, useEffect} from "react";
import Square from "./Square";
import {DataSnapshot} from "@firebase/database-types";

const CombatField = () => {
    const [squares, setSquares] = useState([] as any[]);

    const firebase = require("firebase");

    const grids = firebase
        .database()
        .ref()
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
                    <div style={styles.tile} onClick={ () => movePlayer(square.id)}>
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
        gridTemplateRows: "repeat(4, 1fr)",
        gridTemplateColumns: "repeat(4, 1fr)",
        backgroundColor: "lightgreen",
        //TODO don't use this magic number
        height: "35em"
    },
    tile: {
        gridRow: "1fr",
        gridColumn: "1fr",
        border: "2px solid black",
        // overflow: "auto",
        // height: "100%",
    }
};
