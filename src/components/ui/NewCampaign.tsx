import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserSearch from "../user/UserSearch";
import UserInfo from "../../model/UserInfo";
import { firestore } from "firebase";

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
    let sessionRef = campaignsRef.doc(campaignId).collection("players");

    players.forEach((player: UserInfo) => {
      batch.set(sessionRef.doc(player.uid!), {});
    });

    campaignsRef
      .doc(campaignId)
      .set(Object.assign({}, session))
      .then(() => {
        batch.commit();
      });
  };

  const createNewSession = (event: any) => {
    event.preventDefault();

    let sessionName = event.target.sessionName.value;
    let session = {
      name: sessionName,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      created_by: user!.uid,
    };

    let generatedCampaignId = usersRef
      .doc(user!.uid)
      .collection("campaigns")
      .doc().id;

    addCampaignIdToPlayers(generatedCampaignId);
    addPlayerIdsToCampaign(generatedCampaignId, session);
  };

  const addPlayer = (player: UserInfo) => {
    if (!players.includes(player)) {
      let newPlayerList = [...players, player] as UserInfo[];
      setPlayers(newPlayerList);
    }
  };

  return (
    <div id="add-new-session">
      <h3>Create new session:</h3>
      {/* <NewCombatfield/> */}
      <form onSubmit={createNewSession}>
        <TextField
          id="sessionName"
          name="sessionName"
          label="Session name"
          required
        />
        <h3>Add player to session:</h3>
        <UserSearch onAddPlayer={addPlayer} />
        <Button type={"submit"} variant={"contained"} color="primary">
          Create new session
        </Button>
      </form>
      <h3>Players in the session:</h3>
      {players.map((player) => (
        <p>{player.name}</p>
      ))}
    </div>
  );
};

export default NewCampaign;
