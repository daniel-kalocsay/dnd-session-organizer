import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";

import Square from "./Square";
import UserInfo from "../../model/UserInfo";

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
                grid.tiles.forEach((tile: any) => {
                    setSquares(squares => [...squares, {id: snapshot.id, active: tile.active}])
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

    useEffect(() => {
        // console.log(squares);
    }, [squares]);


    //TODO use these to store individual grids in db

    // grids.push({tiles: newSquares}) // saves grid in db under "grids" node and generates key for it
    // myGrid.set({tiles: newSquares}); // sets data in a node

    const movePlayer = (id: any) => {
        console.log(id);
        let newSquares = squares.map(square => {
            return { active: square.id === id };
        });

        gridRef.update({ tiles: newSquares }).then(() => {
            // console.log("Update successful")
        });

    };

    return (
        <div style={styles.grid}>
            {squares
                ? squares.map(square => (
                    <div
                        style={square.active ? styles.active : styles.inactive}
                        onClick={() => movePlayer(square.id)}
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
