import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

import CampaignPreviewData from "../../model/CampaignPreviewData";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

const CampaignList = () => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const usersRef = useContext(FirebaseContext)!.usersRef;
    const [campaigns, setCampaigns] = useState([] as CampaignPreviewData[]);

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            fetchCampaigns();
        }
    }, [user]);

    const sortCampaignList = () => {
        return campaigns.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    };

    const fetchCampaigns = async () => {
        let campaignsCol: QuerySnapshot = await usersRef
            .doc(user!.uid)
            .collection("campaigns")
            .get();

        campaignsCol.forEach((campaignRef: DocumentSnapshot) => {
            campaignsRef
                .doc(campaignRef.id)
                .get()
                .then(async (campaignDoc: DocumentSnapshot) => {
                    if (campaignDoc.exists) {
                        let entry = campaignDoc.data();

                        let playersCol: QuerySnapshot = await campaignDoc.ref
                            .collection("players")
                            .get();

                        let playerIds = [] as string[];
                        playersCol.forEach((player: DocumentSnapshot) => {
                            playerIds.push(player.id);
                        });

                        let combatfieldsCol: QuerySnapshot = await campaignDoc.ref
                            .collection("combatfields")
                            .get();

                        let combatfieldIds = [] as string[];
                        combatfieldsCol.forEach(
                            (combatfield: DocumentSnapshot) => {
                                combatfieldIds.push(combatfield.id);
                            }
                        );

                        let data = new CampaignPreviewData(
                            campaignDoc.id,
                            entry!.name,
                            entry!.created_at.toDate(),
                            playerIds,
                            combatfieldIds
                        );
                        setCampaigns((oldData) => [...oldData, data]);
                    }
                });
        });
    };

    const deleteCampaign = async (campaignId: string) => {
        let playersCol: QuerySnapshot = await campaignsRef
            .doc(campaignId)
            .collection("players")
            .get();

        playersCol.forEach((player: DocumentSnapshot) => {
            usersRef
                .doc(player.id)
                .collection("campaigns")
                .doc(campaignId)
                .delete();
            player.ref.delete();
        });

        campaignsRef.doc(campaignId).delete();

        usersRef
            .doc(user!.uid)
            .collection("campaigns")
            .doc(campaignId)
            .delete();

        let updatedCampaigns = campaigns.filter(
            (campaign: CampaignPreviewData) => campaign.uid !== campaignId
        );

        setCampaigns(updatedCampaigns);
    };

    return (
        <div style={styles.campaignListContainer}>
            {sortCampaignList().map((campaign: CampaignPreviewData) => (
                <div style={styles.cardContainer} key={campaign.uid}>
                    <Card style={styles.card}>
                        <CardHeader title={campaign.name} />
                        <CardContent>
                            <p>
                                created at:{" "}
                                {campaign.createdAt
                                    ? campaign.getDate()
                                    : "no date"}
                            </p>
                            <p>
                                Number of players: {campaign.playerIds.length}
                            </p>
                            <p>
                                Number of combatfields:{" "}
                                {campaign.combatfieldIds.length}
                            </p>
                            <Link
                                to={{
                                    pathname: "/campaign",
                                    search: `?id=${campaign.uid}`,
                                    state: { campaign: campaign },
                                }}
                            >
                                <Button color={"primary"}>Details</Button>
                            </Link>
                            <p>no more accidents</p>
                            <Button
                                onClick={() => {
                                    deleteCampaign(campaign.uid);
                                }}
                            >
                                Delete (don't click by accident)
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default CampaignList;

const styles = {
    campaignListContainer: {
        display: "grid",
        gridGap: "1em",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 300px))",
        gridTemplateRows: "repeat(auto-fill, 1fr)",
    },
    cardContainer: {
        // maxWidth: 350,
        // cursor: "pointer"
    },
    card: {
        backgroundColor: "#eee",
    },
};
