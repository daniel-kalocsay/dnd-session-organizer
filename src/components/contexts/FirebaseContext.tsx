import React, { createContext } from "react";

export interface firebaseContextInterface {
  firebase: any;
  auth: any;
  database: { child: any };
}

export const FirebaseContext = createContext<firebaseContextInterface | null>(
  null
);

export const FirebaseProvider = (props: any) => {
  const firebase = require("firebase");
  const auth = firebase.auth;
  const database = firebase.database().ref();

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
