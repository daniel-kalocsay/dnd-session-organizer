import React, { createContext } from "react";
import firebase from 'firebase';

export interface firebaseContextInterface {
  firebase: any;
  auth: firebase.auth.Auth;
  database: firebase.database.Database;
}

export const FirebaseContext = createContext<firebaseContextInterface | null>(
  null
);

export const FirebaseProvider = (props: any) => {
  //TODO import it indeed
  //const firebase = require("firebase");
  const auth = firebase.auth();
  const database = firebase.database();

  const firebaseHandler: firebaseContextInterface = {
    firebase,
    auth,
    database
  };

  return (
    <div>
      <FirebaseContext.Provider value={firebaseHandler}>
        {props.children}
      </FirebaseContext.Provider>
    </div>
  );
};
