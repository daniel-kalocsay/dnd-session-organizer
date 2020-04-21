import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import GridTile from "./GridTile";
import Tile from "../../model/Tile";
import {useAuthState} from "react-firebase-hooks/auth";
import UserInfo from "../../model/UserInfo";
import Button from "@material-ui/core/Button";

type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
type DocumentReference = firebase.firestore.DocumentReference;
type CollectionReference = firebase.firestore.CollectionReference;
type QuerySnapshot = firebase.firestore.QuerySnapshot;

const CombatGrid = (props: any) => {

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    const campaignRef = useContext(FirebaseContext)!.campaignsRef.doc(props.campaignId);
    let gridRef = campaignRef.collection("combatfields").doc(props.gridData.uid);
    let tilesRef:CollectionReference = gridRef.collection("tiles");


    const [tiles, setTiles] = useState<Tile[]>([] as Tile[]);
    const [players, setPLayers] = useState<UserInfo[]>([]);

    const fetchGrid = async() => {

        setTiles([]);

        tilesRef.onSnapshot((tilesCol: QuerySnapshot) => {
            let newTiles = [] as Tile[];

            tilesCol.forEach((tile: any) => {
                let tileData = tile.data();

                let newTile = new Tile(tile.ref.id, tileData.x, tileData.y, tileData.occupied_by);
                newTiles.push(newTile);
            });
            setTiles(newTiles);
        })

    };

    useEffect(() => {
        setPLayers(props.players);
        fetchGrid();
    }, []);

    const getPlayerName = (tile: Tile) => {
        let player = players.find(p => p.uid === tile.occupied_by);

        if (player) {
            return player!.name;
        }

        return "";
    };

    const movePlayer = async(selectedTile: Tile) => {
        let playerOnTile = selectedTile.occupied_by;
        let movable = playerOnTile === "" || playerOnTile === user!.uid;

        if (movable) {
            let newTiles = tiles.map((tile: Tile) => {
                let newTile = new Tile(tile.uid, tile.x, tile.y, user!.uid);
                let emptyTile = new Tile(tile.uid, tile.x, tile.y, tile.occupied_by === user!.uid ? "" : tile.occupied_by as string);

                return tile === selectedTile ? newTile : emptyTile;
            });


            newTiles.forEach((tile: Tile) => {
                let tileObject = Object.assign({}, tile);
                tilesRef.doc(tile.uid).set(tileObject);
            })

        }

    };

    return (
        <div style={styles.grid}>
            {tiles
                ? tiles.map((tile: Tile) => (
                    <div
                        style={tile.occupied_by !== "" ? styles.active : styles.inactive}
                        onClick={() => movePlayer(tile)}
                    >
                        <GridTile tile={tile} player={getPlayerName(tile)}/>
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
