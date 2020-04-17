import React, { useState, useContext, useEffect, useRef } from "react";
import firebase, { firestore } from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import CombatfieldData from "../../model/CombatfieldData";
import CombatfieldList from "../combat/CombatfieldList";
import UserSearch from "../user/UserSearch";
import UserInfo from "../../model/UserInfo";
import Button from "@material-ui/core/Button";
import { useLocation, Redirect } from "react-router-dom";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

//TODO component too big, refactor
const CampaignDetails = () => {
  const combatfieldsRef = useContext(FirebaseContext)!.combatfieldsRef;
  const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
  const usersRef = useContext(FirebaseContext)!.usersRef;

  //TODO maybe collect the campaign variables into one campaign object?
  const [campaignId, setId] = useState("" as string);
  const [combatfieldData, setCombatfieldData] = useState(
    [] as CombatfieldData[]
  );

  //Campaign Name variables
  const state = useLocation().state as any;
  const [campaignName, setName] = useState(state.campaign.name as string);
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);

  const [originalPlayers, setOriginalPlayers] = useState(
    state.campaign.playerIds as string[]
  );
  const [players, setPlayers] = useState([] as UserInfo[]);

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
    batch.update(campaignsRef.doc(campaignId), { name: campaignName });
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

  const fetchCombatfields = async () => {
    let campaignsCol: QuerySnapshot = await campaignsRef
      .doc(campaignId!)
      .collection("combatfields")
      .get();

    campaignsCol.forEach((data: DocumentSnapshot) => {
      combatfieldsRef
        .doc(data.id)
        .get()
        .then((combatfieldRecord: DocumentSnapshot) => {
          if (combatfieldRecord.exists) {
            let entry = combatfieldRecord.data();
            let data = new CombatfieldData(combatfieldRecord.id, entry!.name);
            setCombatfieldData((oldData) => [...oldData, data]);
          }
        });
    });
  };

  const fetchPlayers = () => {
    //TODO make sure if using async await here is slower
    originalPlayers.forEach((playerId) => {
      usersRef
        .doc(playerId)
        .get()
        .then((userRecord: DocumentSnapshot) => {
          let userInfo = new UserInfo(playerId, userRecord.data()!.username);
          setPlayers((oldData) => [...oldData, userInfo] as UserInfo[]);
        });
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

  const deletePlayerFromState = (playerId: string) => {
    let playerRemoved = players.filter((player) => player.uid !== playerId);
    setPlayers(playerRemoved);
  };

  const deleteUpdatedPlayers = (playerId: string) => {
    campaignsRef.doc(campaignId).collection("players").doc(playerId).delete();
    usersRef.doc(playerId).collection("campaigns").doc(campaignId).delete();
  };

  const prepareDatabaseBatch = () => {
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
    missing.forEach((p) => deleteUpdatedPlayers(p));
    plus.forEach((p) => saveUpdatedPlayers(p));
    updateCampaignName();
  };

  //TODO sumbit button only enabled when real change happened
  const isCampaignDetailsChanged = () => {
    return true;
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
        <span onClick={() => setInputVisible(true)}>{campaignName}</span>
      )}
      <CombatfieldList combatfields={combatfieldData} />
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
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default CampaignDetails;
