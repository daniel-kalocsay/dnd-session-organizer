import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FirebaseContext } from "../contexts/FirebaseContext";
import { SelectedCampaignContext } from "../contexts/SelectedCampaignContext";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Paper from "@material-ui/core/Paper"

import CombatfieldData from "../../model/CombatfieldData";
import ModalWrapper from "../../wrappers/ModalWrapper";
import NewCombatfield from "./NewCombatfield";
import {useAuthState} from "react-firebase-hooks/auth";

const CombatfieldList = () => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const campaignDetails = useContext(SelectedCampaignContext);

    const handleClick = (combatfieldId: string) => {
        campaignsRef
            .doc(campaignDetails!.campaignId)
            .collection("combatfields")
            .doc(combatfieldId)
            .delete();
    };

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    const sortCombatfieldList = () => {
        //TODO should sort by createdAt instead (which is something a CombatfieldData doesn't have atm)
        return campaignDetails!.combatfields.sort((a, b) => (a.name > b.name ? 1 : -1));
    };

    return (
        <Card id="combatfield-list" style={styles.mainWrapper}>

            <CardHeader title={"Combatfields"} style={styles.title}/>

            <Paper style={styles.scrollableWindow}>
                <List style={styles.listContainer}>
                {campaignDetails!.combatfields && campaignDetails!.campaignId !== ""
                    ? sortCombatfieldList().map(
                        (combatfield: CombatfieldData) => (
                            <ListItem key={combatfield.uid}  style={styles.combatfieldInfo}>
                                    <div style={styles.fieldName}>
                                        <Link
                                            to={{
                                                pathname: "/combat",
                                                search: `?id=${combatfield.uid}`,
                                                // TODO: use context?
                                                state: {
                                                    campaignId: campaignDetails!.campaignId,
                                                    combatfieldData: combatfield,
                                                    DMName: campaignDetails?.DM.name,
                                                    DMId: campaignDetails?.DM.uid,
                                                    players: campaignDetails!.players,
                                                },
                                            }}
                                            key={combatfield.uid}
                                        >
                                            {combatfield.name}
                                        </Link>
                                    </div>

                                    <div style={styles.fieldSize}>
                                        {/*//TODO store size in db and in CombatfieldData model class */}
                                    </div>

                                {user && campaignDetails!.DM.uid === user!.uid ?
                                    <CardActions style={styles.fieldDelete}>
                                        <Button
                                            color={"secondary"}
                                            variant={"outlined"}
                                            onClick={() => handleClick(combatfield.uid)}
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                    : ""
                                }

                            </ListItem>
                        )
                    )
                    : ""}
                </List>
            </Paper>

            <div style={styles.addNewButton}>
                <ModalWrapper buttonName={"Add combatfield"} variant={"outlined"}>
                    <NewCombatfield campaignId={campaignDetails!.campaignId} />
                </ModalWrapper>
            </div>

        </Card>
    );
};

export default CombatfieldList;

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
    addNewButton: {
        // border: "1px solid black",

        // cell positioning
        gridColumn: "1/3",
        gridRow: "7/8",
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
    listContainer: {
        // border: "1px solid black",

        // define grid
        display: "grid",
        gridTemplateRows: "repeat(auto-fill, 1fr)",
        gridGap: "1em",

        // adjustment
        padding: "1em",
    },
    combatfieldInfo: {
        border: "1px solid black",
        borderRadius: "0.25em",

        // define grid
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "0.2em"

    },
    fieldName: {
        // cell positioning
        gridColumn: "1/3"
    },
    fieldSize: {
        // cell positioning
        gridColumn: "3/4"
    },
    fieldDelete: {
        // cell positioning
        gridColumn: "4/5"
    }
};
