//TODO resolve warnings for import
const firebaseConnectionTest = () => {

    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");

    let db = firebase.database().ref();
    console.log(db);
    
    // firebase listener

    // testCollectionRef
    //     .onSnapshot((snapshot: QuerySnapshot) => {
    //
    //         //snapshot of the db collection's current state
    //         if (snapshot) {
    //             let snapDate = new Date();
    //             let timestamp = snapDate.getHours() + ":" + snapDate.getMinutes() + ":" + snapDate.getSeconds();
    //
    //             console.log(`Entries in Test collection snapshot at ${timestamp}:`);
    //
    //             snapshot.forEach((entry: DocumentSnapshot) => {
    //                 console.log(entry.data());
    //             });
    //         }
    //     });
};

export default firebaseConnectionTest;
