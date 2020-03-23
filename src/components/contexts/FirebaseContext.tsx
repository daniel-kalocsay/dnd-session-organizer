import React, { createContext } from "react";

export interface firebaseContextInterface {
  firebase: any;
  auth: any;
  database: {child: any};
}

export const FirebaseContext = createContext<firebaseContextInterface | null>(
  null
);

export const FirebaseProvider = (props: any) => {
  const firebaseValue = require("firebase");
  const authValue = firebaseValue.auth;
  const databaseValue = firebaseValue.database().ref();

  const firebaseHandler: firebaseContextInterface = {
    firebase: firebaseValue,
    auth: authValue,
    database: databaseValue
  };

  return (
    <div>
      <FirebaseContext.Provider value={firebaseHandler}>
        {props.children}
      </FirebaseContext.Provider>
    </div>
  );
};
