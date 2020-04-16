import React, {useContext, useState, useEffect} from "react";
import {FirebaseContext} from "../contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserSearch from "../user/UserSearch";
import UserInfo from "../../model/UserInfo";
import {firestore} from "firebase";

const NewCampaign = () => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const usersRef = useContext(FirebaseContext)!.usersRef;
    const firebase = useContext(FirebaseContext)!.firebase;

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    const [players, setPlayers] = useState<UserInfo[]>([]);

    useEffect(() => {
        let userData = new UserInfo(user!.uid, user!.email!);
        setPlayers([...players, userData]);
    }, []);

    const addCampaignIdToPlayers = (campaignId: string) => {
        players.forEach((player: UserInfo) => {
            usersRef.doc(player.uid!).collection("campaigns").doc(campaignId).set({});
        });
    };

    const addPlayerIdsToCampaign = (campaignId: string, session: Object) => {
        let batch: firestore.WriteBatch = firebase.firestore().batch();
        let playersCol = campaignsRef.doc(campaignId).collection("players");

        players.forEach((player: UserInfo) => {
            batch.set(playersCol.doc(player.uid!), {});
        });

        campaignsRef
            .doc(campaignId)
            .set(Object.assign({}, session))
            .then(() => {
                batch.commit();
            });
    };

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

        addCampaignIdToPlayers(generatedCampaignId);
        addPlayerIdsToCampaign(generatedCampaignId, campaign);
    };

    const addPlayer = (player: UserInfo) => {
        if (!players.some(p => p.uid === player.uid)) {
            let newPlayerList = [...players, player] as UserInfo[];
            setPlayers(newPlayerList);
        }
    };

    return (
        <div id="add-new-campaign">
            <h3>Create new campaign:</h3>
            {/* <NewCombatfield/> */}
            <form onSubmit={createNewCampaign}>
                <TextField
                    id="sessionName"
                    name="campaignName"
                    label="Campaign name"
                    required
                />
                <h3>Add player to campaign:</h3>
                <UserSearch onAddPlayer={addPlayer}/>
                <Button type={"submit"} variant={"contained"} color="primary">
                    Create new campaign
                </Button>
            </form>
            <h3>Players in the campaign:</h3>
            {players.map((player) => (
                <p>{player.name}</p>
            ))}
        </div>
    );
};

export default NewCampaign;
