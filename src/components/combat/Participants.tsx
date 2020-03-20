import React, {useEffect, useState} from "react";

const Participants = () => {
    const [players, setPlayers] = useState([] as any[]);

    let playersStub: any;

    const initPlayers = () => {
        return [
            {
                id: 0,
                name: "Dungeon Master",
                status: "keeping everyone alive"
            },
            {
                id: 1,
                name: "Carric",
                status: "status"
            },
            {
                id: 2,
                name: "Gregan",
                status: "trying to keep his integrity"
            },
            {
                id: 3,
                name: "Filbert",
                status: "hiding"
            },
            {
                id: 4,
                name: "Ginso",
                status: "dead"
            },
        ];
    };

    useEffect( () => {
        playersStub = initPlayers();
        setPlayers(playersStub);
    }, []);

    return (
        <div style={styles.container}>

            {/*<div>Players:</div>*/}

            <div style={styles.players}>{
                players ? players.map((player: any) => {
                    return (
                        <div style={styles.player}>
                            <div style={styles.name}>{player.name}</div>
                            <div style={styles.status}>
                                <div>{player.status}</div>
                            </div>
                        </div>
                    )
                }) : "No players"}
            </div>
        </div>
    )
};

export default Participants;

const styles = {
    container: {
        display: "grid",
        gridTemplateColumns: "1fr",
        margin: "0.5em"
    },
    players: {
        display: "grid",
        gridTemplateRows: "repeat(5, 1fr)",
        gridGap: "1em"
    },
    player: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr",
        border: "2px solid gray",
        alignItems: "center"
    },
    name: {
        gridColumn: "1/2",
        margin: "0.5em"
    },
    status: {
        gridColumn: "2/3",
        margin: "0.5em"
    }
};