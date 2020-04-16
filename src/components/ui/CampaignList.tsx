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
      .then((playersDoc: QuerySnapshot) => {
        playersDoc.forEach((player: DocumentSnapshot) => {
          usersRef
            .doc(player.id)
            .collection("campaigns")
            .doc(campaignId)
            .delete();
          player.ref.delete();

          //TODO entire campaigns collection of the user is deleted after this
          // if it was the only one. is that okay?
        });

        campaignsRef.doc(campaignId).delete();
      });

    usersRef.doc(user!.uid).collection("campaigns").doc(campaignId).delete();

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
            <CardHeader title={campaign.name} />
            <CardContent>
              <p>
                created at:{" "}
                {campaign.createdAt ? campaign.getDate() : "no date"}
              </p>

              <Link to={`/campaign?id=${campaign.uid}`}>Details</Link>
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
