import firebase from "firebase";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

const NewCampaign = () => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const usersRef = useContext(FirebaseContext)!.usersRef;
    const firebase = useContext(FirebaseContext)!.firebase;


    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    let history = useHistory();

    const addCampaignIdToDM = (campaignId: string) => {
        usersRef.doc(user!.uid).collection("campaigns").doc(campaignId).set({});
    };

    const addDMToCampaign = (previewData: any) => {
        let campaign = {
            name: previewData.name,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            created_by: user!.uid,
        };

        campaignsRef.doc(previewData.id)
                    .set(Object.assign({}, campaign))
                    .then( () => redirectToCampaignDetails(previewData) );
    };

    const generatePreview = (campaignName: string, userSnap: DocumentSnapshot) => {

        let generatedCampaignId = userSnap.ref
            .collection("campaigns")
            .doc().id;

        return {
            id: generatedCampaignId,
            name: campaignName,
            playerIds: [],
            DMId: userSnap.id,
            DMName: userSnap.data()!.username
        };

    };

    const createNewCampaign = async(event: any) => {
        event.preventDefault();

        let userSnap: DocumentSnapshot = await usersRef.doc(user!.uid).get();
        let previewDoc = generatePreview(event.target.campaignName.value, userSnap);

        addCampaignIdToDM(previewDoc.id);
        addDMToCampaign(previewDoc);
    };

    const redirectToCampaignDetails = (campaignData: any) => {
        history.push({
            pathname: "/campaign",
            search: `?id=${campaignData.id}`,
            state: { campaign: campaignData },
        });
        //TODO fix this so we don't need another doc read to get the DM name
    };

    return (
        <div id="add-new-campaign">
            <h3>Create new campaign:</h3>
            <form onSubmit={createNewCampaign}>
                <TextField
                    id="sessionName"
                    name="campaignName"
                    label="Campaign name"
                    required
                />
                <Button type={"submit"} variant={"contained"} color="primary">
                    Create new campaign
                </Button>
            </form>
        </div>
    );
};

export default NewCampaign;
