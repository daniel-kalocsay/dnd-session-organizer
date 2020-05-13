import React, { createContext } from "react";
import firebase from "firebase";

export interface firebaseContextInterface {
  firebase: any;
  auth: firebase.auth.Auth;
  usersRef: firebase.firestore.CollectionReference;
  combatfieldsRef: firebase.firestore.CollectionReference;
  campaignsRef: firebase.firestore.CollectionReference;
}

export const FirebaseContext = createContext<firebaseContextInterface | null>(
  null
);

export const FirebaseProvider = (props: any) => {
  const auth = firebase.auth();
  const combatfieldsRef = firebase.firestore().collection("combatfields");

  const campaignsRef = firebase.firestore().collection("campaigns");
  const usersRef = firebase.firestore().collection("users");

  const firebaseHandler: firebaseContextInterface = {
    firebase,
    auth,
    usersRef,
    combatfieldsRef,
    campaignsRef
  };

  return (
    <div>
      <FirebaseContext.Provider value={firebaseHandler}>
        {props.children}
      </FirebaseContext.Provider>
    </div>
  );
};
