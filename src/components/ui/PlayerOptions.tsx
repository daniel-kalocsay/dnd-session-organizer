import React from "react";

import UserSearch from "../user/UserSearch";
import UserInfo from "../../model/UserInfo";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Paper from "@material-ui/core/Paper"
import ModalWrapper from "../../wrappers/ModalWrapper";
import NewCombatfield from "./NewCombatfield";

const PlayerOptions = (props: any) => {
    return (
        <Card style={styles.mainWrapper}>
            <CardHeader title={"Players"} style={styles.title}/>

            {props.players.length === 0 ? ( <p>No players yet, add some!</p> ) : (
                <Paper style={styles.scrollableWindow}>
                    <List style={styles.playerlistContainer}>
                        {props.players.map((player: UserInfo) => (
                            <ListItem key={player.uid!} style={styles.playerInfo}>

                                <div style={styles.playerName}>{player.name}</div>

                                <CardActions style={styles.removeButton}>
                                    <Button
                                        color={"secondary"}
                                        variant={"outlined"}
                                        onClick={() => {
                                            props.deletePlayer(player.uid!);
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </CardActions>
                            </ListItem>
                        )) }
                    </List>
                </Paper>
            )}

            <div style={styles.addPlayerForm}>
                <ModalWrapper buttonName={"Add player"} variant={"outlined"}>
                    <div style={styles.userSearchModalWrapper}>
                        <h3>Add player to the campaign:</h3>
                        <UserSearch />
                    </div>
                </ModalWrapper>
            </div>

        </Card>
    );
};

export default PlayerOptions;

const styles = {
    mainWrapper: {
        border: "1px solid black",

        // define grid
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(7, 1fr)",
        gridGap: "1em",

        // adjustment
        padding: "1em"
    },
    title: {
        // cell positioning
        gridColumn: "1/3",
        gridRow: "1/2",

        // adjustments
        justifySelf: "center"
    },
    scrollableWindow: {
        border: "1px solid black",
        backgroundColor: "#f4f4f4",

        // cell positioning
        gridColumn: "1/3",
        gridRow: "2/7",

        // make it scrollable
        maxHeight: "25em",
        overflow: "auto",
    },
    playerlistContainer: {
        // border: "1px solid black",

        // define grid
        display: "grid",
        gridTemplateRows: "repeat(auto-fill, 1fr)",
        gridGap: "1em",

        // adjustment
        padding: "1em",
    },
    addPlayerForm: {
        // border: "1px solid black",

        // cell positioning
        gridColumn: "1/3",
        gridRow: "7/8",
    },
    playerInfo: {
        border: "1px solid black",
        borderRadius: "0.25em",

        // define grid
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: "0.2em"
    },
    playerName: {
        // cell positioning
        gridColumn: "1/2"
    },
    removeButton: {
        // cell positioning
        gridColumn: "4/5"
    },
    userSearchModalWrapper: {
        display: "grid",
        gridGap: "2em"
    }
};
