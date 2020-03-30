import firebase from 'firebase';
import React, { useContext } from 'react'
import { FirebaseContext } from '../contexts/FirebaseContext';
import {useAuthState} from "react-firebase-hooks/auth";
import Grid from "./Grid"

export const NewCombatField = () => {
    const combatfields = firebase.firestore().collection('combatfields').doc();

    const auth = useContext(FirebaseContext)!.auth;
    const [user, initializing, authError] = useAuthState(auth);


    const createNewCombatfield = () => {
        let id = user!.uid;
        let grid = new Grid(100, [id])

        combatfields.set(Object.assign({}, grid));
        
    }

    return (
        <div>
            <button onClick={createNewCombatfield}></button>
        </div>
    )
}
