import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import firebase, { firestore } from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { SelectedCampaignContext } from "../contexts/SelectedCampaignContext";

import PlayerOptions from "./PlayerOptions";
import EditableText from "./EditableText";
import CombatfieldList from "./CombatfieldList";

import CombatfieldData from "../../model/CombatfieldData";
import UserInfo from "../../model/UserInfo";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

const CampaignDetails = () => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const usersRef = useContext(FirebaseContext)!.usersRef;
    const campaignDetails = useContext(SelectedCampaignContext);

    const state = useLocation().state as any;
    const [originalPlayers, setOriginalPlayers] = useState(
        state.campaign.playerIds as string[]
    );
    const [originalCampaignName] = useState(state.campaign.name as string);

    const [batch, setBatch] = useState(
        firebase.firestore().batch() as firestore.WriteBatch
    );

    //TODO use specialized hook for this
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let id = params.get("id");
        campaignDetails!.setId(id);

        campaignDetails!.setName(state.campaign.name);

        let DM = new UserInfo(state.campaign.DMId, state.campaign.DMName);
        campaignDetails!.setDM(DM);
    }, []);

    //TODO when new campaign is created player fetch shouldnt occur
    useEffect(() => {
        if (campaignDetails!.campaignId) {
            fetchCombatfields();

            if (state.previousLocation === "campaign-list") {
                fetchPlayersWithId(originalPlayers);
            } else {
                fetchPlayersWithoutId();
            }
        }
    }, [campaignDetails!.campaignId]);

    const updateCampaignName = () => {
        batch.update(campaignsRef.doc(campaignDetails!.campaignId), {
            name: campaignDetails!.campaignName,
        });
    };

    //TODO put into context
    const fetchCombatfields = () => {
        campaignDetails!.setCombatFields([]);

        campaignsRef
            .doc(campaignDetails!.campaignId)
            .collection("combatfields")
            .onSnapshot(function (docs) {
                docs.docChanges().forEach(function (change) {
                    if (change.type === "added") {
                        let entry = change.doc.data();
                        let combatfield = new CombatfieldData(
                            change.doc.id,
                            entry!.name
                        );
                        campaignDetails!.setCombatFields(
                            (oldData: CombatfieldData[]) => [
                                ...oldData,
                                combatfield,
                            ]
                        );
                    } else if (change.type === "removed") {
                        let removedId = change.doc.id;
                        campaignDetails!.setCombatFields(
                            (oldData: CombatfieldData[]) =>
                                oldData.filter((d) => d.uid !== removedId)
                        );
                    }
                });
            });
    };

    //TODO put into PlayersOptions
    const fetchPlayersWithId = (playerIds: string[]) => {
        playerIds.forEach(async (playerId) => {
            let userRecord: DocumentSnapshot = await usersRef
                .doc(playerId)
                .get();

            let userInfo = new UserInfo(playerId, userRecord.data()!.username);
            campaignDetails!.setPlayers(
                (oldData: UserInfo[]) => [...oldData, userInfo] as UserInfo[]
            );
        });
    };

    const fetchPlayersWithoutId = () => {
        campaignsRef
            .doc(campaignDetails!.campaignId)
            .get()
            .then(async (campaignDoc: DocumentSnapshot) => {
                if (campaignDoc.exists) {
                    let playersCol: QuerySnapshot = await campaignDoc.ref
                        .collection("players")
                        .get();

                    let playerIds = [] as string[];
                    playersCol.forEach((player: DocumentSnapshot) => {
                        playerIds.push(player.id);
                    });

                    if (playerIds.length > 0) {
                        setOriginalPlayers(playerIds);
                        fetchPlayersWithId(playerIds);
                    }
                }
            });
    };

    const saveUpdatedPlayers = (playerId: string) => {
        batch.set(
            usersRef
                .doc(playerId)
                .collection("campaigns")
                .doc(campaignDetails!.campaignId),
            {}
        );
        batch.set(
            campaignsRef
                .doc(campaignDetails!.campaignId)
                .collection("players")
                .doc(playerId),
            {}
        );
    };

    const deletePlayerFromState = (playerId: string) => {
        let playerRemoved = campaignDetails!.players.filter(
            (player) => player.uid !== playerId
        );
        campaignDetails!.setPlayers(playerRemoved);
    };

    const deleteUpdatedPlayers = (playerId: string) => {
        campaignsRef
            .doc(campaignDetails!.campaignId)
            .collection("players")
            .doc(playerId)
            .delete();
        usersRef
            .doc(playerId)
            .collection("campaigns")
            .doc(campaignDetails!.campaignId)
            .delete();
    };

    const prepareDatabaseBatch = () => {
        let result = compareOriginalAndRecentPlayers();

        result.missing.forEach((p) => deleteUpdatedPlayers(p));
        result.plus.forEach((p) => saveUpdatedPlayers(p));
        updateCampaignName();
    };

    const compareOriginalAndRecentPlayers = () => {
        let missing = [...originalPlayers];
        let plus = [...campaignDetails!.players.map((player) => player.uid!)];

        campaignDetails!.players.forEach((p: UserInfo) =>
            originalPlayers.forEach((op: string) => {
                if (p.uid === op) {
                    missing = missing.filter((player) => player !== op);
                    plus = plus.filter((player) => player !== op);
                }
            })
        );

        return { missing: missing, plus: plus };
    };

    const hasCampaignDetailsChanged = () => {
        let playersResult = compareOriginalAndRecentPlayers();
        return (
            playersResult.missing.length === 0 &&
            playersResult.plus.length === 0 &&
            originalCampaignName === campaignDetails!.campaignName
        );
    };

    //TODO show result of commit
    const handleSubmit = () => {
        prepareDatabaseBatch();
        let result = batch.commit().then(() => {
            setBatch(firebase.firestore().batch());
        });
        result ? console.log("done") : console.log("nope");
    };

    return (
        <Paper style={styles.mainWrapper}>

            {/*<Paper style={styles.combatfieldsWrapper}>*/}
            {/*    <CombatfieldList />*/}
            {/*</Paper>*/}
            {/*//TODO this maybe shouldn't be a Paper*/}

            <div style={styles.combatfieldsWrapper}>
                <CombatfieldList />
            </div>

            <Paper style={styles.campaignInfoWrapper}>
                <span>
                    <EditableText
                        saveText={campaignDetails!.setName}
                        initialText={campaignDetails!.campaignName}
                    />
                </span>

                <p>(Click to edit)</p>

                <p>Dungeon master: {state.campaign.DMName}</p>
            </Paper>

            {/*<Paper style={styles.playersWrapper}>*/}
            <div style={styles.playersWrapper}>
                <PlayerOptions
                    players={campaignDetails!.players}
                    deletePlayer={deletePlayerFromState}
                />
            </div>
            {/*</Paper>*/}

            <Button
                style={styles.saveChangesButton}
                disabled={hasCampaignDetailsChanged()}
                onClick={handleSubmit}
            >
                Save changes
            </Button>
        </Paper>
    );
};

export default CampaignDetails;

const styles = {
    mainWrapper: {
        // define grid
        display: "grid",
        gridTemplateRows: "repeat(auto-fit, 1fr)",
        gridTemplateColumns: "repeat(8, 1fr)",
        gridGap: "1em",
    },
    campaignInfoWrapper: {
        // cell positioning
        gridColumn: "3/7",
        gridRow: "1/2",
    },
    combatfieldsWrapper: {
        // cell positioning
        gridColumn: "2/5",
        gridRow: "2/3",
    },
    playersWrapper: {
        // cell positioning
        gridColumn: "5/8",
        gridRow: "2/3",
    },
    saveChangesButton: {
        border: "1px solid black",
        //TODO make it clear that this only saves changes to the name and the players

        // cell positioning
        gridColumn: "2/8",
        gridRow: "3/4",
    },
};
