import React, { createContext } from "react";
import firebase from "firebase";

export interface firebaseContextInterface {
  firebase: any;
  auth: firebase.auth.Auth;
  sessionsRef: firebase.firestore.CollectionReference;
  usersRef: firebase.firestore.CollectionReference;
  combatfieldsRef: firebase.firestore.CollectionReference;
}

export const FirebaseContext = createContext<firebaseContextInterface | null>(
  null
);

export const FirebaseProvider = (props: any) => {
  const auth = firebase.auth();
  const sessionsRef = firebase.firestore().collection("sessions");
  const usersRef = firebase.firestore().collection("users");
  const combatfieldsRef = firebase.firestore().collection("combatfields");

  const firebaseHandler: firebaseContextInterface = {
    firebase,
    auth,
    sessionsRef,
    usersRef,
    combatfieldsRef,
  };

  return (
    <div>
      <FirebaseContext.Provider value={firebaseHandler}>
        {props.children}
      </FirebaseContext.Provider>
    </div>
  );
};
