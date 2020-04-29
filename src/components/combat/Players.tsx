import React, { useEffect, useState } from "react";
import UserInfo from "../../model/UserInfo";

const Players = (props: any) => {
    const getStubbedPlayers = () => {
        return [
            {
                uid: 0,
                name: "These",
                status: "keeping everyone alive",
            },
            {
                uid: 1,
                name: "players",
                status: "status",
            },
            {
                uid: 2,
                name: "are",
                status: "trying to keep his integrity",
            },
            {
                uid: 3,
                name: "all",
                status: "hiding",
            },
            {
                uid: 4,
                name: "fake",
                status: "dead",
            },
            {
                uid: 5,
                name: "hehe",
                status: "it does now",
            },
        ];
    };

    const players: UserInfo[] = props.players
        ? props.players
        : getStubbedPlayers();

    return (
        <div style={styles.container}>
            <div style={styles.players}>
                {props.DM ? (
                    <div style={styles.player}>
                        <div style={styles.name}>
                            Dungeon Master: {props.DM}
                        </div>
                    </div>
                ) : (
                    ""
                )}

                {players
                    ? players.map((player: UserInfo) => {
                          return (
                              <div key={player!.uid!} style={styles.player}>
                                  <div style={styles.name}>{player.name}</div>
                                  <div style={styles.status}>
                                      <div>
                                          {player.status
                                              ? player.status
                                              : "no status"}
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : "No players"}
            </div>
        </div>
    );
};

export default Players;

const styles = {
    container: {
        display: "grid",
        gridTemplateColumns: "1fr",
        margin: "0.5em",
    },
    players: {
        display: "grid",
        gridTemplate: "repeat(auto-fit, 1fr)",
        gridGap: "1em",
    },
    player: {
        display: "grid",
        gridTemplate: "repeat(2, 1fr)",
        // gridTemplateColumns: "repeat(2, 1fr)",
        border: "2px solid gray",
        alignItems: "center",
    },
    name: {
        gridColumn: "1/2",
        margin: "0.5em",
    },
    status: {
        gridColumn: "2/3",
        margin: "0.5em",
    },
};
