import React, { useContext } from "react";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "firebase";

const NewSession = () => {
  const sessionsRef = useContext(FirebaseContext)!.sessionsRef;
  const usersRef = useContext(FirebaseContext)!.usersRef;

  const auth = useContext(FirebaseContext)!.auth;
  const [user, initializing, authError] = useAuthState(auth);

  const createNewSession = (event: any) => {
    event.preventDefault();

    let sessionName = event.target.sessionName.value;
    let session = {
      name: sessionName,
      created_on: firebase.firestore.FieldValue.serverTimestamp(),
      created_by: user!.uid,
    };

    let sessionId = usersRef.doc(user!.uid).collection("sessions").doc().id;
    usersRef.doc(user!.uid).collection("sessions").doc(sessionId).set({});

    console.log(sessionId);

    sessionsRef
      .doc(sessionId)
      .set(Object.assign({}, session))
      .then(() => {
        sessionsRef.doc(sessionId).collection("players").doc(user!.uid).set({});
      });

    //sessionsRef.doc(sessionId).collection("players").doc(user!.uid).set({});
  };

  return (
    <div id="add-new-session">
      <form onSubmit={createNewSession}>
        <TextField
          id="sessionName"
          name="sessionName"
          label="Session name"
          required
        />
        <Button type={"submit"} variant={"contained"} color="primary">
          Create new session
        </Button>
      </form>
    </div>
  );
};

export default NewSession;
