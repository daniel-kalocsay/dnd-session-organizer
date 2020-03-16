const firebaseConnectionTest = () => {

    const firebase = require("firebase");

    // Required for side-effects
    require("firebase/firestore");


    let db = firebase.firestore();
    let testCollectionRef = db.collection("test");

    //TODO use QuerySnapshot and DocumentSnapshot for type instead of any
    testCollectionRef
        .onSnapshot((snapshot: any) => {

            //snapshot of the db collection's current state
            if (snapshot) {
                let snapDate = new Date();
                let timestamp = snapDate.getHours() + ":" + snapDate.getMinutes() + ":" +snapDate.getSeconds();

                console.log(`Entries in Test collection snapshot at ${timestamp}:`);

                snapshot.forEach((entry: any) => {
                    console.log(entry.data());
                });
            }
        });
};

export default firebaseConnectionTest;
