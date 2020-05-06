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

    const fetchPlayerName = (playerId: string) => {
        let DM = usersRef
            .doc(playerId)
            .get()
            .then((userDoc: DocumentSnapshot) => {
                if (userDoc.exists) {
                    return userDoc.data()!.username;
                }
            });

        return DM;
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

                        let DM = await fetchPlayerName(entry!.created_by);

                        let data = new CampaignPreviewData(
                            campaignDoc.id,
                            entry!.name,
                            entry!.created_at.toDate(),
                            DM,
                            entry!.created_by,
                            playerIds,
                            combatfieldIds
                        );
                        setCampaigns((oldData) => [...oldData, data]);
                    }
                });
        });
    };

    //TODO delete combatfields collection as well
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

    const newCampaignCard = (
        <Card style={styles.card.container}>
            <CardHeader title={"Create new"} style={styles.card.header} />
            <CardContent style={styles.card.content}>
                <Link to={"/new-campaign"}>
                    <div style={styles.plusSign}>&#8853;</div>
                </Link>
            </CardContent>
        </Card>
    );

    return (
        <div style={styles.campaignListContainer}>
            {campaigns ? newCampaignCard : ""}
            {sortCampaignList().map((campaign: CampaignPreviewData) => (
                <div style={styles.cardContainer} key={campaign.uid}>
                    <Card style={styles.card.container}>
                        <CardHeader
                            title={campaign.name}
                            style={styles.card.header}
                        />
                        <CardContent style={styles.card.content}>
                            <p>Dungeon master: {campaign.DMName}</p>
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
                                    state: {
                                        campaign: campaign,
                                        previousLocation: "campaign-list",
                                    },
                                }}
                                style={{
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
                                <Button
                                    color={"primary"}
                                    variant={"outlined"}
                                    style={styles.button}
                                >
                                    More details
                                </Button>
                            </Link>
                        </CardContent>
                        <div style={styles.card.bottom}>
                            <Button
                                onClick={() => {
                                    deleteCampaign(campaign.uid);
                                }}
                                color={"secondary"}
                                variant={"outlined"}
                                style={styles.button}
                            >
                                Delete
                            </Button>
                        </div>
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
        gridTemplateRows: "repeat(3, 1fr)",
    },
    cardContainer: {
        // maxWidth: 350,
        // cursor: "pointer"
        // backgroundColor: "#eee",
    },
    card: {
        container: {
            display: "grid",
            gridTemplateRows: "repeat(auto-fill, 1fr)",
            backgroundColor: "#eee",
        },
        header: {
            gridRow: "1/2",
            margin: "0.5em auto",
        },
        content: {
            gridRow: "3/6",
            margin: "0 auto",
        },
        bottom: {
            gridRow: "8/9",
            margin: "1em auto",
        },
    },
    plusSign: {
        fontSize: "8em",
    },
    button: {
        width: "15em",
    },
};
