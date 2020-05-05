import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
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
    const [tiles, setTiles] = useState<Tile[]>([] as Tile[]);
    const [players, setPLayers] = useState<UserInfo[]>([]);

    let unSubscribe = () => {};

    const fetchGrid = async () => {
        setTiles([]);

        gridRef.onSnapshot((gridSnap) => {
            let grid = gridSnap.data();
            let tiles = grid!.tiles;

            let newTiles = tiles.map((tile: any, index: number) => {
                let id = index.toString();
                return new Tile(id, tile.x, tile.y, tile.occupied_by);
            });
            setTiles(newTiles);
            initialPlayerPlacement(newTiles);
        });
    };

    const initialPlayerPlacement = (localTiles: Tile[]) => {
        props.players.forEach((player: any) => {
            if (localTiles.every((tile) => tile.occupied_by !== player.uid)) {
                let emptyTile = localTiles.find(
                    (tile) => tile.occupied_by === ""
                );
                emptyTile!.occupied_by = player.uid;
            }
        });
        localTiles.forEach(
            (tile, index) => (localTiles[index] = Object.assign({}, tile))
        );
        gridRef.update({ tiles: localTiles });
    };

    useEffect(() => {
        setPLayers(props.players);
        fetchGrid();

        if (user?.uid === props.DMId) {
            setDM(true);
        }

        return () => unSubscribe();

        //TODO detach realtime listener if combatgrid is deleted from db
    }, []);

    const getPlayerName = (tile: Tile) => {
        let player = players.find((p) => p.uid === tile.occupied_by);

        if (player) {
            return player.name;
        } else if (!player && user!.uid === tile.occupied_by) {
            return props.DMName;
        }

        return "";
    };

    const movePlayer = (draggedTile: Tile, droppedTile: Tile) => {
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

    const modifyIcon = (clickedTileId: string, newOccupant: string) => {
        let clickedTile = tiles.find((tile) => tile.uid === clickedTileId);
        clickedTile!.occupied_by = newOccupant;
        gridRef.update({ tiles: tiles });
    };

    return (
        <div style={styles.grid}>
            {tiles
                ? tiles.map((tile: Tile) => (
                      <GridTile
                          key={tile.uid}
                          tile={tile}
                          playerOnTile={getPlayerName(tile)}
                          movePlayer={movePlayer}
                          IamTheDM={amITheDM}
                          user={user?.uid}
                          modifyIcon={modifyIcon}
                      />
                  ))
                : null}
        </div>
    );
};

export default CombatGrid;

const styles = {
    grid: {
        display: "grid",
        gridTemplateRows: `repeat(10, 1fr)`,
        gridTemplateColumns: `repeat(10, 1fr)`,
        backgroundColor: "lightgreen",
        //TODO don't use this magic number
        height: "30em",
    },
};
