import React, {useState, useContext, useEffect, useRef} from "react";
import {Link, useLocation} from "react-router-dom";
import firebase, {firestore} from "firebase";
import {FirebaseContext} from "../contexts/FirebaseContext";
import CombatfieldData from "../../model/CombatfieldData";
import CombatfieldList from "../combat/CombatfieldList";
import UserSearch from "../user/UserSearch";
import UserInfo from "../../model/UserInfo";
import Button from "@material-ui/core/Button";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

//TODO component too big, refactor
const CampaignDetails = () => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const usersRef = useContext(FirebaseContext)!.usersRef;

    //TODO store original and current cmpaign details state in objects
    const [campaignId, setId] = useState("" as string);

    //Campaign Name variables
    const state = useLocation().state as any;
    const [campaignName, setName] = useState(state.campaign.name as string);
    const inputRef = useRef(null);
    const [inputVisible, setInputVisible] = useState(false);

    const [originalPlayers, setOriginalPlayers] = useState(
        state.campaign.playerIds as string[]
    );
    const [players, setPlayers] = useState([] as UserInfo[]);

    const [originalCombatfields, setOriginalCombatfields] = useState(
        state.campaign.combatfieldIds as string[]
    );

    const [combatfields, setCombatFields] = useState(
        [] as CombatfieldData[]
    );

    const [batch, setBatch] = useState(
        firebase.firestore().batch() as firestore.WriteBatch
    );

    //TODO use specialized hook for this
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const campaignId = params.get("id");
        setId(campaignId!);
    }, []);

    useEffect(() => {
        if (campaignId) {
            fetchCombatfields();
            fetchPlayers();
        }
    }, [campaignId]);

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
        batch.update(campaignsRef.doc(campaignId), {name: campaignName});
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

    const fetchCombatfields = () => {

        originalCombatfields.forEach(async (combatfieldId: string) => {
            let combatfieldDoc:DocumentSnapshot = await
                campaignsRef
                    .doc(campaignId)
                    .collection("combatfields")
                    .doc(combatfieldId).get();

            if (combatfieldDoc.exists) {
                let entry = combatfieldDoc.data();
                let data = new CombatfieldData(combatfieldDoc.id, entry!.name);
                setCombatFields((oldData) => [...oldData, data]);
            }

        });
    };

    const fetchPlayers = () => {
        //TODO make sure if using async await here is slower
        originalPlayers.forEach(async (playerId) => {
            let userRecord: DocumentSnapshot = await
                usersRef
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
            usersRef.doc(playerId).collection("campaigns").doc(campaignId),
            {}
        );
        batch.set(
            campaignsRef.doc(campaignId).collection("players").doc(playerId),
            {}
        );
    };

    const deletePlayerFromState = (userId: string) => {
        let playerRemoved = players.filter((player) => player.uid !== userId);
        setPlayers(playerRemoved);
    };

    const deleteUpdatedPlayers = (playerId: string) => {
        campaignsRef.doc(campaignId).collection("players").doc(playerId).delete();
        usersRef.doc(playerId).collection("campaigns").doc(campaignId).delete();
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

        return {missing: missing, plus: plus};
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

            <div id="combatfield-list">
                <h2>Combatfields:</h2>
                {combatfields && campaignId !== "" ? combatfields.map((combatfield: CombatfieldData) => (
                    <div>
                        <Link
                            to={{
                                pathname: "/combat",
                                search: `?id=${combatfield.uid}`,
                                state: { campaignId: campaignId, combatfieldData: combatfield, players: players },
                            }}
                            key={combatfield.uid}
                        >
                            {combatfield.name}
                        </Link>
                        <br />
                    </div>
                )) : ""}
            </div>

            <h3>Add player to the campaign:</h3>
            <UserSearch onAddPlayer={addPlayerToState}/>

            <h3>Players in the campaign:</h3>

            {players.length === 0 ? <p>Loading players...</p> :
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
                )
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
