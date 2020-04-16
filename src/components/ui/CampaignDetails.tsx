import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import CombatfieldData from "../../model/CombatfieldData";
import CombatfieldList from "../combat/CombatfieldList";
import UserSearch from "../user/UserSearch";
import UserInfo from "../../model/UserInfo";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import CampaignPreviewData from "../../model/CampaignPreviewData";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

const CampaignDetails = (props: any) => {
  const combatfieldsRef = useContext(FirebaseContext)!.combatfieldsRef;
  const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
  const usersRef = useContext(FirebaseContext)!.usersRef;

  const [campaignId, setId] = useState("" as string);
  const [combatfieldData, setCombatfieldData] = useState(
    [] as CombatfieldData[]
  );
  const [players, setPlayers] = useState([] as UserInfo[]);

  let state = useLocation().state as any;
  let campaignName = state.name as string;

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

  const addPlayer = (userData: UserInfo) => {
    let userId = userData!.uid;

    usersRef.doc(userId!).collection("campaigns").doc(campaignId).set({});
    campaignsRef.doc(campaignId).collection("players").doc(userId!).set({});
  };

  const deletePlayer = (userId: string) => {
    campaignsRef.doc(campaignId).collection("players").doc(userId).delete();
    usersRef.doc(userId).collection("campaigns").doc(campaignId).delete();
  };

  return (
    <div>
      <h2>{campaignName}</h2>
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
    </div>
  );
};

export default CampaignDetails;
