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

    const tiles = grids.child("grid1").child("tiles");

    const movePlayer = (id: any) => {
        let newSquares = squares.map(square => {
            return {active: square.id === id};
        });

        tiles.set(newSquares)
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
                ? squares.map(square => <Square square={square} onMove={movePlayer}/>)
                : null}
        </div>
    );
};

export default CombatField;

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr"
    }
};
