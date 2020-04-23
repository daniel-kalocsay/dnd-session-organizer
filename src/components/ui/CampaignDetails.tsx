import React, { useState, useContext, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import firebase, { firestore } from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import CombatfieldData from "../../model/CombatfieldData";
import CombatfieldList from "./CombatfieldList";
import NewCombatfield from "./NewCombatfield";
import UserSearch from "../user/UserSearch";
import UserInfo from "../../model/UserInfo";
import Button from "@material-ui/core/Button";
import { SelectedCampaignContext } from "../contexts/SelectedCampaignContext";

type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

//TODO component too big, refactor
const CampaignDetails = () => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const usersRef = useContext(FirebaseContext)!.usersRef;
    const campaignDetails = useContext(SelectedCampaignContext);

    //Campaign Name variables
    const state = useLocation().state as any;
    const [campaignName, setName] = useState(state.campaign.name as string);
    const inputRef = useRef(null);
    const [inputVisible, setInputVisible] = useState(false);

    const [originalPlayers] = useState(state.campaign.playerIds as string[]);
    const [players, setPlayers] = useState([] as UserInfo[]);

    //TODO do we need the passed down combatfields since we have a listener on the collection?
    const [originalCombatfields] = useState(
        state.campaign.combatfieldIds as string[]
    );

    const [combatfields, setCombatFields] = useState([] as CombatfieldData[]);

    const [batch, setBatch] = useState(
        firebase.firestore().batch() as firestore.WriteBatch
    );

    //TODO use specialized hook for this
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let id = params.get("id");
        campaignDetails!.setId(id);
    }, []);

    useEffect(() => {
        if (campaignDetails!.campaignId) {
            fetchCombatfields();
            fetchPlayers();
        }
    }, [campaignDetails!.campaignId]);

    useEffect(() => {
        isCampaignDetailsChanged();
    }, [originalPlayers, players]);

    const onClickOutside = (e: any) => {
        // Check if user is clicking outside of <input>
        if (inputRef.current) {
            let input = inputRef.current as any;
            if (!input.contains(e.target)) {
                setInputVisible(false);
            }
        }
    };

    const updateCampaignName = () => {
        batch.update(campaignsRef.doc(campaignDetails!.campaignId), {
            name: campaignName,
        });
    };

    useEffect(() => {
        // Handle outside clicks on mounted state
        if (inputVisible) {
            document.addEventListener("mousedown", onClickOutside);
        }

        // This is a necessary step to "dismount" unnecessary events when we destroy the component
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    });

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
                        setCombatFields((oldData) => [...oldData, combatfield]);
                    } else if (change.type === "removed") {
                        let removedId = change.doc.id;
                        setCombatFields((oldData) =>
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
            setPlayers((oldData) => [...oldData, userInfo] as UserInfo[]);
        });
    };

    const addPlayerToState = (player: UserInfo) => {
        if (!players.some((p) => p.uid === player.uid)) {
            let newPlayerList = [...players, player] as UserInfo[];
            setPlayers(newPlayerList);
        }
    };

    const saveUpdatedPlayers = (playerId: string) => {
        batch.set(
            usersRef.doc(playerId).collection("campaigns").doc(campaignDetails!.campaignId),
            {}
        );
        batch.set(
            campaignsRef.doc(campaignDetails!.campaignId).collection("players").doc(playerId),
            {}
        );
    };

    const deletePlayerFromState = (userId: string) => {
        let playerRemoved = players.filter((player) => player.uid !== userId);
        setPlayers(playerRemoved);
    };

    const deleteUpdatedPlayers = (playerId: string) => {
        campaignsRef
            .doc(campaignDetails!.campaignId)
            .collection("players")
            .doc(playerId)
            .delete();
        usersRef.doc(playerId).collection("campaigns").doc(campaignDetails!.campaignId).delete();
    };

    const prepareDatabaseBatch = () => {
        let result = compareOriginalAndRecentPlayers();

        result.missing.forEach((p) => deleteUpdatedPlayers(p));
        result.plus.forEach((p) => saveUpdatedPlayers(p));
        updateCampaignName();
    };

    const compareOriginalAndRecentPlayers = () => {
        let missing = [...originalPlayers];
        let plus = [...players.map((player) => player.uid!)];

        players.forEach((p: UserInfo) =>
            originalPlayers.forEach((op: string) => {
                if (p.uid === op) {
                    missing = missing.filter((player) => player !== op);
                    plus = plus.filter((player) => player !== op);
                }
            })
        );

        return { missing: missing, plus: plus };
    };

    //TODO include campaign name change as well
    const isCampaignDetailsChanged = () => {
        let result = compareOriginalAndRecentPlayers();
        return result.missing.length === 0 && result.plus.length === 0;
    };

    const handleSubmit = () => {
        prepareDatabaseBatch();
        batch.commit().then(() => {
            setBatch(firebase.firestore().batch());
        });
    };

    return (
        <div>
            {/* Editable Campaign name */}
            {inputVisible ? (
                <input
                    ref={inputRef}
                    value={campaignName}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            ) : (
                <span onClick={() => setInputVisible(true)}>
                    {campaignName}
                </span>
            )}

            <CombatfieldList
                combatfields={combatfields}
                players={players}
                campaignId={campaignDetails!.campaignId}
            />

            {/* TODO create button to navigate to another location for combatfield creation*/}
            <NewCombatfield campaignId={campaignDetails!.campaignId} />

            {/* Players */}
            <h3>Add player to the campaign:</h3>
            <UserSearch onAddPlayer={addPlayerToState} />

            <h3>Players in the campaign:</h3>

            {players.length === 0 ? (
                <p>Loading players...</p>
            ) : (
                players.map((player: UserInfo) => (
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
                disabled={isCampaignDetailsChanged()}
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </div>
    );
};

export default CampaignDetails;
