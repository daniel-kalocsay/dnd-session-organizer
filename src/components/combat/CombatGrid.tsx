import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import Square from "./Square";
import Tile from "../../model/Tile";
import {useAuthState} from "react-firebase-hooks/auth";

type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
type QuerySnapshot = firebase.firestore.QuerySnapshot;

const CombatGrid = (props: any) => {

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    const campaignRef = useContext(FirebaseContext)!.campaignsRef.doc(props.campaignId);
    let gridRef = campaignRef.collection("combatfields").doc(props.gridData.uid);

    const [tiles, setTiles] = useState<Tile[]>([] as Tile[]);

    const buildGrid = async() => {
        let tilesRef:QuerySnapshot = await gridRef.collection("tiles").get();

        tilesRef.forEach((tile: any) => {
            console.log(tile);
            console.log(tile.data());

            let newTile = new Tile(tile.uid, tile.x, tile.y, tile.occupied_by);
            setTiles(oldData => [...oldData, newTile]);
        });

    };

    useEffect(() => {
        buildGrid();
    }, []);

    useEffect(() => {
        console.log(tiles);
    }, [tiles]);

    const movePlayer = (currentTile: Tile) => {
        console.log(currentTile);
        
        let playerOnTile = currentTile.occupied_by;
        let movable:boolean = playerOnTile === "" || playerOnTile === user!.uid;

        let newTiles = tiles.map((tile) => {
            return Object.assign({}, currentTile, { occupied_by: movable ? user!.uid : tile.occupied_by });
        });

        console.log(newTiles);

        setTiles(newTiles);

        // gridRef.set({ tiles: newTiles }).then(() => {
        //     // console.log("Update successful")
        // });
    };

    return (
        <div style={styles.grid}>
            {tiles
                ? tiles.map((tile: Tile) => (
                    <div
                        style={tile.occupied_by !== "" ? styles.inactive : styles.active}
                        onClick={() => movePlayer(tile)}
                    >
                        <Square square={tile} />
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
        height: "30em",
    },
    tile: {
        //TODO resolve styling of tiles, use active/inactive to change color
    },
    active: {
        border: "2px solid black",
        backgroundColor: "red",
    },
    inactive: {
        border: "2px solid black",
        backgroundColor: "lightgreen",
    },
};
