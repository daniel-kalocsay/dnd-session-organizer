import React, {useState, useContext, useEffect} from "react";

import firebase from "firebase";
import {FirebaseContext} from "../contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

import CombatfieldData from "../../model/CombatfieldData";
import CombatfieldList from "../combat/CombatfieldList";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Typography} from "@material-ui/core";

type QuerySnapshot = firebase.firestore.QuerySnapshot;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

const Session = (props: any) => {
    const combatfieldsRef = firebase.firestore().collection("combatfields");

    const usersRef = firebase.firestore().collection("users");

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);

    const [combatfieldData, setCombatfieldData] = useState([] as CombatfieldData[]);
    const [selected, setSelected] = useState<boolean>(false);

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
        <ExpansionPanel expanded={selected} onChange={ () => {setSelected(!selected)} }>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography>Details</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <CombatfieldList combatfields={combatfieldData} />
                </ExpansionPanelDetails>

        </ExpansionPanel>
    );
};

export default Session;
