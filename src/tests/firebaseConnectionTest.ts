import { DataSnapshot } from "@firebase/database-types";

const firebaseConnectionTest = () => {
  const firebase = require("firebase");

  let db = firebase.database().ref();

  //TODO import and use proper types instead of any
  db.on("value", (snapshot: DataSnapshot) => {
    if (snapshot) {
      let snapDate = new Date();
      let timestamp =
        snapDate.getHours() +
        ":" +
        snapDate.getMinutes() +
        ":" +
        snapDate.getSeconds();

      console.log(`Realtime db snapshot at ${timestamp}:`);
      console.log(snapshot.val());
    }
  });
};

export default firebaseConnectionTest;
