import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

const NewSession = () => {
  const sessionsRef = useContext(FirebaseContext)!.sessionsRef;
  const usersRef = useContext(FirebaseContext)!.usersRef;

  const auth = useContext(FirebaseContext)!.auth;
  const [user, initializing, authError] = useAuthState(auth);

  const createNewSession = () => {
    let sessionId = usersRef.doc(user!.uid).collection("sessions").doc().id;
    usersRef.doc(user!.uid).collection("sessions").doc(sessionId).set({});

    sessionsRef.doc(sessionId).collection("players").doc(user!.uid).set({});
  };

  return (
    <div id="add-new-session">
      <button onClick={createNewSession}>Create new session</button>
    </div>
  );
};

export default NewSession;
