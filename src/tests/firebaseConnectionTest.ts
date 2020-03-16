import { QuerySnapshot, DocumentSnapshot } from '@firebase/firestore-types';

//TODO resolve warnings for import

const firebaseConnectionTest = () => {

    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");


    let db = firebase.firestore();
    let testCollectionRef = db.collection("test");

    testCollectionRef
        .onSnapshot((snapshot: QuerySnapshot) => {

            //snapshot of the db collection's current state
            if (snapshot) {
                let snapDate = new Date();
                let timestamp = snapDate.getHours() + ":" + snapDate.getMinutes() + ":" + snapDate.getSeconds();

                console.log(`Entries in Test collection snapshot at ${timestamp}:`);

                snapshot.forEach((entry: DocumentSnapshot) => {
                    console.log(entry.data());
                });
            }
        });
};

export default firebaseConnectionTest;
