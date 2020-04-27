import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import firebase, { firestore } from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import CombatfieldData from "../../model/CombatfieldData";
import CombatfieldList from "./CombatfieldList";
import NewCombatfield from "./NewCombatfield";
import UserSearch from "../user/UserSearch";
import UserInfo from "../../model/UserInfo";
import Button from "@material-ui/core/Button";
import { SelectedCampaignContext } from "../contexts/SelectedCampaignContext";
import { EditableText } from "./EditableText";

type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

//TODO component too big, refactor
const CampaignDetails = () => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const usersRef = useContext(FirebaseContext)!.usersRef;
    const campaignDetails = useContext(SelectedCampaignContext);

    const state = useLocation().state as any;
    const [originalPlayers] = useState(state.campaign.playerIds as string[]);
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
    }, []);

    useEffect(() => {
        if (campaignDetails!.campaignId) {
            fetchCombatfields();
            fetchPlayers();
        }
    }, [campaignDetails!.campaignId]);

    useEffect(() => {
        hasCampaignDetailsChanged();
    }, [
        originalPlayers,
        campaignDetails!.players,
        campaignDetails!.campaignName,
    ]);

    const updateCampaignName = () => {
        batch.update(campaignsRef.doc(campaignDetails!.campaignId), {
            name: campaignDetails!.campaignName,
        });
    };

    //TODO put into context
    const fetchCombatfields = () => {
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

    //TODO put into context
    const fetchPlayers = () => {
        originalPlayers.forEach(async (playerId) => {
            let userRecord: DocumentSnapshot = await usersRef
                .doc(playerId)
                .get();

            let userInfo = new UserInfo(playerId, userRecord.data()!.username);
            campaignDetails!.setPlayers(
                (oldData: UserInfo[]) => [...oldData, userInfo] as UserInfo[]
            );
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

    const deletePlayerFromState = (userId: string) => {
        let playerRemoved = campaignDetails!.players.filter(
            (player) => player.uid !== userId
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
        console.log(campaignDetails!.campaignName);
        return (
            playersResult.missing.length === 0 &&
            playersResult.plus.length === 0 &&
            originalCampaignName === campaignDetails!.campaignName
        );
    };

    const handleSubmit = () => {
        prepareDatabaseBatch();
        batch.commit().then(() => {
            setBatch(firebase.firestore().batch());
        });
    };

    return (
        <div>
            <EditableText
                saveText={campaignDetails!.setName}
                initialText={campaignDetails!.campaignName}
            />

            <CombatfieldList />

            {/* TODO create button to navigate to another location for combatfield creation*/}
            <NewCombatfield />

            {/* Players */}
            <h3>Add player to the campaign:</h3>
            <UserSearch />

            <h3>Players in the campaign:</h3>

            {campaignDetails!.players.length === 0 ? (
                <p>Loading players...</p>
            ) : (
                campaignDetails!.players.map((player: UserInfo) => (
                    <div key={player.uid!}>
                        <p>{player.name}</p>
                        <Button
                            onClick={() => {
                                deletePlayerFromState(player.uid!);
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                ))
            )}
            <Button
                disabled={hasCampaignDetailsChanged()}
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </div>
    );
};

export default CampaignDetails;
