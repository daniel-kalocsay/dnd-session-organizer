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
    const [tiles, setTiles] = useState<Tile[]>([] as Tile[]);
    const [players, setPLayers] = useState<UserInfo[]>([]);

    let unSubscribe = () => {};

    const fetchGrid = async () => {
        setTiles([]);

        unSubscribe = gridRef.onSnapshot(async (gridSnap) => {
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

        return () => unSubscribe();

        //TODO detach realtime listener if combatgrid is deleted from db
    }, []);

    const getPlayerName = (tile: Tile) => {
        let player = players.find((p) => p.uid === tile.occupied_by);

        if (player) {
            return player!.name;
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
