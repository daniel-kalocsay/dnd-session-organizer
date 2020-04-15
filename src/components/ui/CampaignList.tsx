import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";

import firebase from "firebase";
import {FirebaseContext} from "../contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

//TODO create a generic class
class CampaignPreviewData {
    name: string;
    uid: string;
    createdAt: Date;

    constructor(uid: string, name: string, createdAt: Date) {
        this.uid = uid;
        this.name = name;
        this.createdAt = createdAt;
    }

    getDate() {
        let date = this.createdAt;
        return `${date.getFullYear()} ${date.getMonth()+1}.${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`;
    }
}

const CampaignList = () => {
    const sessionsRef = useContext(FirebaseContext)!.sessionsRef;

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

    const fetchCampaigns = () => {
        usersRef
            .doc(user!.uid)
            .collection("campaigns")
            .get()
            .then((querySnapshot: QuerySnapshot) => {
                querySnapshot.forEach((campaignRef: DocumentSnapshot) => {
                    campaignsRef
                        .doc(campaignRef.id)
                        .get()
                        .then((campaignDoc: DocumentSnapshot) => {
                            if (campaignDoc.exists) {
                                let entry = campaignDoc.data();
                                let data = new CampaignPreviewData(
                                    campaignDoc.id,
                                    entry!.name,
                                    entry!.created_at.toDate()
                                );
                                setCampaigns((oldData) => [...oldData, data]);
                            }
                        });
                });
            });
    };

    //TODO im sure this can be done in a better way
    const deleteCampaign = (campaignId: string) => {
        campaignsRef
            .doc(campaignId)
            .collection("players")
            .get()
            .then((playerDoc: QuerySnapshot) => {
                playerDoc.forEach((player: DocumentSnapshot) => {
                    usersRef.doc(player.id).collection("campaigns").doc(campaignId).delete();
                });
                playerDoc.forEach((user: DocumentSnapshot) => {
                    user.ref.delete();
                });
                campaignsRef.doc(campaignId).delete();
            });

        let updatedCampaigns = campaigns.filter(
            (campaign: CampaignPreviewData) => campaign.uid !== campaignId
        );
        setCampaigns(updatedCampaigns);
    };

    return (
        <div style={styles.campaignListContainer}>
            {campaigns.map((campaign: CampaignPreviewData) => (
                <div style={styles.cardContainer} key={campaign.uid}>
                    <Card style={styles.card}>
                        <CardHeader title={campaign.name}/>
                        <CardContent>
                            <p>created at: {campaign.createdAt ? campaign.getDate() : "no date"}</p>

                            <Link to={`/session?id=${campaign.uid}`}>Details</Link>
                            <Button
                                onClick={() => {
                                    deleteCampaign(campaign.uid);
                                }}
                            >
                                Delete
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
