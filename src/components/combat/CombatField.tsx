import React, {useState, useEffect, useContext} from "react";
import Square from "./Square";
//import {DataSnapshot} from "@firebase/database-types";
import { FirebaseContext } from "../contexts/FirebaseContext";
import firebase from "firebase";
type DataSnapshot = firebase.database.DataSnapshot

const CombatField = () => {
    const [squares, setSquares] = useState<DataSnapshot[]>([]);

    const database = useContext(FirebaseContext)!.database.ref();
    

    const grids = database
        .child("grids");

    const grid1 = grids.child("grid1");
    const myGrid = grids.child("-M2sG9eGGqRaBHZAHDnl");
    const tiles = grids.child("grid1").child("tiles");


    //TODO use these to store individual grids in db

    // grids.push({tiles: newSquares}) // saves grid in db under "grids" node and generates key for it
    // myGrid.set({tiles: newSquares}); // sets data in a node

    const movePlayer = (id: any) => {
        let newSquares = squares.map(square => {
            return {active: square.key === id};
        });

        grid1.update({tiles: newSquares})
            .then( () => {
                // console.log("Update successful")
            } );

        // same as: tiles.set(newSquares);

    };

    const updateSquares = () => {
        tiles.on("value", (snapshot: DataSnapshot) => {

            let updatedSquares = [] as DataSnapshot[];

            snapshot.forEach( (child: DataSnapshot) => {
                updatedSquares.push(child);
            });

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
                    <div style={square.val().active ? styles.active : styles.inactive}
                         onClick={ () => movePlayer(square.key) }>
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
        //TODO resolve styling of tiles, use active/inactive to change color
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
