import React, { useContext, useEffect, useState, useRef } from "react";
import firebase, { firestore } from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import GridTile from "./GridTile";
import Tile from "../../model/Tile";
import { useAuthState } from "react-firebase-hooks/auth";
import UserInfo from "../../model/UserInfo";

type CollectionReference = firebase.firestore.CollectionReference;

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
        fetchGrid();

        if (user?.uid === props.DMId) {
            setDM(true);
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

    const dragNDropMovePlayer = (draggedTile: Tile, droppedTile: Tile) => {
        let newTiles = tiles.map((tile) => {
            if (tile.uid === draggedTile.uid) {
                return Object.assign(
                    {},
                    new Tile(draggedTile.uid, draggedTile.x, draggedTile.y, "")
                );
            } else if (tile.uid === droppedTile.uid) {
                return Object.assign(
                    {},
                    new Tile(
                        droppedTile.uid,
                        droppedTile.x,
                        droppedTile.y,
                        draggedTile.occupied_by
                    )
                );
            } else {
                return Object.assign({}, tile);
            }
        });
        gridRef.update({ tiles: newTiles });
    };

    const DMMovesPlayer = (selectedTile: Tile) => {
        let playerOnTile = selectedTile.occupied_by;

        // player clicked?
        let playerTileClicked = playerOnTile !== "";

        // player stored in state?
        let playerStored = DMSelectedPlayerTile.uid !== undefined;

        if (playerTileClicked && !playerStored) {
            setDMSelectedPlayerTile(selectedTile);
        } else if (!playerTileClicked && playerStored) {
            let newTiles = tiles.map((tile) => {
                if (tile.uid === DMSelectedPlayerTile.uid) {
                    return Object.assign(
                        {},
                        new Tile(
                            DMSelectedPlayerTile.uid,
                            DMSelectedPlayerTile.x,
                            DMSelectedPlayerTile.y,
                            ""
                        )
                    );
                } else if (tile.uid === selectedTile.uid) {
                    return Object.assign(
                        {},
                        new Tile(
                            selectedTile.uid,
                            selectedTile.x,
                            selectedTile.y,
                            DMSelectedPlayerTile.occupied_by
                        )
                    );
                } else {
                    return Object.assign({}, tile);
                }
            });
            gridRef.update({ tiles: newTiles });
            setDMSelectedPlayerTile({} as Tile);
        }
    };

    return (
        <div style={styles.grid}>
            {tiles
                ? tiles.map((tile: Tile) => (
                      <GridTile
                          key={tile.uid}
                          tile={tile}
                          player={getPlayerName(tile)}
                          movePlayer={dragNDropMovePlayer}
                      />
                      //   <div
                      //       key={tile.uid}
                      //       style={
                      //           tile.occupied_by !== ""
                      //               ? styles.active
                      //               : styles.inactive
                      //       }
                      //       //   onClick={() =>
                      //       //       amITheDM ? DMMovesPlayer(tile) : movePlayer(tile)
                      //       //   }
                      //   >
                      //   </div>
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
    dragged: {
        opacity: "0.5",
    },
};
