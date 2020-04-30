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

    const addDMToCampaign = (previewData: any, campaign: Object) => {
        campaignsRef.doc(previewData.id)
                    .set(Object.assign({}, campaign))
                    .then( () => redirectToCampaignDetails(previewData) );
    };

    //TODO break into smaller methods
    const createNewCampaign = async(event: any) => {
        event.preventDefault();

        let campaignName = event.target.campaignName.value;
        let campaign = {
            name: campaignName,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            created_by: user!.uid,
        };

        let userSnap: DocumentSnapshot = await usersRef.doc(user!.uid).get();
        let userData = userSnap.data();

        let generatedCampaignId = userSnap.ref
            .collection("campaigns")
            .doc().id;

        addCampaignIdToDM(generatedCampaignId);

        let previewData = {
            id: generatedCampaignId,
            name: campaignName,
            playerIds: [],
            DMId: userSnap.id,
            DMName: userData!.username
        };

        addDMToCampaign(previewData, campaign);
    };

    const redirectToCampaignDetails = (campaignData: any) => {
        history.push({
            pathname: "/campaign",
            search: `?id=${campaignData.id}`,
            state: { campaign: campaignData },
        });
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
