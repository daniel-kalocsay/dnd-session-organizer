import React, {useState, useContext, useEffect} from "react";

import firebase from "firebase";
import {FirebaseContext} from "../contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

import CombatfieldData from "../../model/CombatfieldData";

import CombatfieldList from "../combat/CombatfieldList";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

const Session = (props: any) => {
    const combatfieldsRef = firebase.firestore().collection("combatfields");

    const [combatfieldData, setCombatfieldData] = useState(
        [] as CombatfieldData[]
    );
    const usersRef = firebase.firestore().collection("users");

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            fetchCombatfields();
        }
    }, [user]);

    //TODO use session ID as well
    const fetchCombatfields = () => {
        let sessionId = props.sessionData.id;

        usersRef
            .doc(user!.uid)
            .collection("combatfields")
            .get()
            .then(function (querySnapshot: QuerySnapshot) {
                querySnapshot.forEach((data: DocumentSnapshot) => {
                    let entry = data.data();
                    combatfieldsRef
                        .doc(entry!.gridId)
                        .get()
                        .then((combatfieldRecord: DocumentSnapshot) => {
                            if (combatfieldRecord.exists) {
                                let entry = combatfieldRecord.data();
                                let data = new CombatfieldData(
                                    entry!.name,
                                    combatfieldRecord.id
                                );
                                setCombatfieldData(oldData => [...oldData, data]);
                            }
                        });
                });
            });
    };

    return (
        <div>
            {props.sessionData.clicked ? (
                <CombatfieldList combatfields={combatfieldData}/>
            ) : (
                ""
            )}
        </div>
    );
};

export default Session;
