import React, { useContext, useState } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const NewCampaign = () => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const usersRef = useContext(FirebaseContext)!.usersRef;
    const firebase = useContext(FirebaseContext)!.firebase;

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    let history = useHistory();

    const addCampaignIdToPlayer = (campaignId: string) => {
        usersRef.doc(user!.uid).collection("campaigns").doc(campaignId).set({});
    };

    const addDMToCampaign = (campaignId: string, session: Object) => {
        campaignsRef.doc(campaignId).set(Object.assign({}, session));
    };

    //TODO break into smaller methods
    const createNewCampaign = (event: any) => {
        event.preventDefault();

        let campaignName = event.target.campaignName.value;
        let campaign = {
            name: campaignName,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            created_by: user!.uid,
        };

        let generatedCampaignId = usersRef
            .doc(user!.uid)
            .collection("campaigns")
            .doc().id;

        let campaignData = {
            name: campaignName,
            playerIds: [],
        };

        addCampaignIdToPlayer(generatedCampaignId);
        addDMToCampaign(generatedCampaignId, campaign);

        history.push({
            pathname: "/campaign",
            search: `?id=${generatedCampaignId}`,
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
