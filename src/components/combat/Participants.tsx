import React, {useEffect, useState} from "react";

const Participants = () => {
    const [players, setPlayers] = useState<[]>([]);
    const [DM, setDM] = useState<[]>([]);

    let participantsStub: any;

    const initParticipants = () => {
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
            {
                id: 5,
                name: "hope this fits",
                status: "it does now"
            },

        ]
    };

    useEffect( () => {
        participantsStub = initParticipants();
        setPlayers(participantsStub);
    }, []);

    return (
        <div style={styles.container}>

            <div style={styles.players}>
                {players ? players.map((player: any) => {
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
        margin: "0.5em",
    },
    players: {
        display: "grid",
        gridTemplate: "repeat(auto-fit, 1fr)",
        gridGap: "1em"
    },
    player: {
        display: "grid",
        gridTemplate: "repeat(2, 1fr)",
        // gridTemplateColumns: "repeat(2, 1fr)",
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