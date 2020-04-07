import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";

import Square from "./Square";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

const CombatGrid = (props: any) => {
    const gridId = props.gridId;

    const [squares, setSquares] = useState<any[]>([] as any[]);

    const combatfieldsRef = firebase.firestore().collection("combatfields");
    const gridRef = combatfieldsRef.doc(gridId);

    const fetchGridData = () => {

        gridRef
            .get()
            .then((snapshot: DocumentSnapshot) => {
                let grid = snapshot.data()!;
                grid.tiles.forEach((tile: any, index:any) => {
                    let square = {id: index, active: tile.active};
                    setSquares(squares => [...squares, square])
                });
            });


        gridRef.onSnapshot((snapshot: DocumentSnapshot) => {
            let tilesTemp = snapshot.get("tiles");
            setSquares(tilesTemp);
        })
    };

    useEffect(() => {
        fetchGridData();
    }, []);

    // grids.push({tiles: newSquares}) // saves grid in db under "grids" node and generates key for it

    const movePlayer = (id: any) => {
        let newSquares = squares.map((square, index) => {
            return { active: index === id };
        });

        gridRef.update({ tiles: newSquares }).then(() => {
            // console.log("Update successful")
        });

    };

    return (
        <div style={styles.grid}>
            {squares
                ? squares.map((square, index) => (
                    <div
                        style={square.active ? styles.active : styles.inactive}
                        onClick={() => movePlayer(index)}
                    >
                        <Square square={square} />
                    </div>
                ))
                : null}
        </div>
    );
};

export default CombatGrid;

const styles = {
    grid: {
        display: "grid",
        gridTemplateRows: "repeat(10, 1fr)",
        gridTemplateColumns: "repeat(10, 1fr)",
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
