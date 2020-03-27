import { useList } from 'react-firebase-hooks/database';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import React, { useContext } from 'react'
import { FirebaseContext } from '../contexts/FirebaseContext';

export const NewCombatField = () => {
    const combatfields = firebase.firestore().collection('combatfields');

    const [snapshots, loading, error] = useCollection(combatfields);

    const createNewCombatfield = () => {
        combatfields.add({})
    }

    return (
        <div>
            <button onClick={createNewCombatfield}></button>
        </div>
    )
}
