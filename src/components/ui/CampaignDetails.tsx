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
  const [players, setPlayers] = useState([] as UserInfo[]);

  //Campaign Name variables
  const state = useLocation().state as any;
  const [campaignName, setName] = useState(state.name as string);
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);

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
        updateCampaignName();
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
    campaignsRef
      .doc(campaignId)
      .collection("players")
      .onSnapshot((querySnapshot: QuerySnapshot) => {
        setPlayers([]);
        querySnapshot.forEach((player: DocumentSnapshot) => {
          usersRef
            .doc(player.id)
            .get()
            .then((userRecord: DocumentSnapshot) => {
              let userInfo = new UserInfo(
                player.id,
                userRecord.data()!.username
              );
              setPlayers((oldData) => [...oldData, userInfo] as UserInfo[]);
            });
        });
      });
  };

  //TODO add players only to the state, not to the db
  const addPlayer = (userData: UserInfo) => {
    let userId = userData!.uid;

    usersRef.doc(userId!).collection("campaigns").doc(campaignId).set({});
    campaignsRef.doc(campaignId).collection("players").doc(userId!).set({});
  };

  const deletePlayer = (userId: string) => {
    campaignsRef.doc(campaignId).collection("players").doc(userId).delete();
    usersRef.doc(userId).collection("campaigns").doc(campaignId).delete();
  };

  //TODO redirect after commit
  const handleSubmit = () => {
    batch.commit();
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
      <h3>Add player to session:</h3>
      <UserSearch onAddPlayer={addPlayer} />
      <h3>Players in the session:</h3>
      {players.map((player: UserInfo) => (
        <div key={player.uid!}>
          <p>{player.name}</p>
          <Button
            onClick={() => {
              deletePlayer(player.uid!);
            }}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default CampaignDetails;
