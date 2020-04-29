import React, { useContext, useEffect, useState } from "react";
import firebase, { firestore } from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import GridTile from "./GridTile";
import Tile from "../../model/Tile";
import { useAuthState } from "react-firebase-hooks/auth";
import UserInfo from "../../model/UserInfo";

type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
type DocumentReference = firebase.firestore.DocumentReference;
type CollectionReference = firebase.firestore.CollectionReference;
type QuerySnapshot = firebase.firestore.QuerySnapshot;

const CombatGrid = (props: any) => {
    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    const campaignRef = useContext(FirebaseContext)!.campaignsRef.doc(
        props.campaignId
    );
    let gridRef = campaignRef
        .collection("combatfields")
        .doc(props.gridData.uid);
    let tilesRef: CollectionReference = gridRef.collection("tiles");

    const [amITheDM, setDM] = useState(false);
    let [DMSelectedPlayerTile, setDMSelectedPlayerTile] = useState({} as Tile);

    const [tiles, setTiles] = useState<Tile[]>([] as Tile[]);
    const [players, setPLayers] = useState<UserInfo[]>([]);

    const fetchGrid = async () => {
        setTiles([]);

        gridRef.onSnapshot(async (gridSnap) => {
            console.log("new snap");
            let newTiles = [] as Tile[];

            let grid = await gridSnap.data();

            let tiles = grid!.tiles;

            tiles.forEach((tile: any, index: number) => {
                let id = index.toString();

                let newTile = new Tile(id, tile.x, tile.y, tile.occupied_by);
                newTiles.push(newTile);
            });

            setTiles(newTiles);
        });
    };

    useEffect(() => {
        setPLayers(props.players);
        console.log(props.players);
        fetchGrid();

        if (user?.uid === props.DMId) {
            console.log("DM arrived!");
        }
    }, []);

    const getPlayerName = (tile: Tile) => {
        let player = players.find((p) => p.uid === tile.occupied_by);

        if (player) {
            return player!.name;
        }

        return "";
    };

    const movePlayer = async (selectedTile: Tile) => {
        let playerOnTile = selectedTile.occupied_by;
        let movable = playerOnTile === "" || playerOnTile === user!.uid;

        if (movable) {
            let tilesArray = tiles.map((tile: Tile) => {
                let newTile = new Tile(tile.uid, tile.x, tile.y, user!.uid);
                let emptyTile = new Tile(
                    tile.uid,
                    tile.x,
                    tile.y,
                    tile.occupied_by === user!.uid
                        ? ""
                        : (tile.occupied_by as string)
                );

                let source = tile === selectedTile ? newTile : emptyTile;
                return Object.assign({}, source);
            });

            gridRef.update({ tiles: tilesArray });
        }
    };

    const DMMovesPlayer = (selectedTile: Tile) => {
        let playerOnTile = selectedTile.occupied_by;

        // first click: tile clicked has player on it?
        let playerTileClicked = playerOnTile !== "";

        // second click: did we have selected a player before?
        let playerStored = DMSelectedPlayerTile.occupied_by !== "";

        if (playerTileClicked && !playerStored) {
            setDMSelectedPlayerTile(selectedTile);
            console.log("player selected");
        } else if (!playerTileClicked && playerStored) {
            setDMSelectedPlayerTile({} as Tile);
            console.log("player moved");
        }
    };

    return (
        <div style={styles.grid}>
            {tiles
                ? tiles.map((tile: Tile) => (
                      <div
                          style={
                              tile.occupied_by !== ""
                                  ? styles.active
                                  : styles.inactive
                          }
                          onClick={() => movePlayer(tile)}
                      >
                          <GridTile tile={tile} player={getPlayerName(tile)} />
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
