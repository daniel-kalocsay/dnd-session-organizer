import React, {useState, useEffect} from "react";
import Square from "./Square";
//import uuid from "react-uuid";

const CombatField = () => {
    const [squares, setSquares] = useState([] as any[]);

    const firebase = require("firebase");

    const playerPosition = firebase
        .database()
        .ref()
        .child("grid");

    const movePlayer = (id: any) => {

        let newSquares = squares.map(square => {
            return {id: square.id, active: square.id === id};
        });

        setSquares(newSquares);
    };

    const initSquares = () => {
        return [
            {
                id: 1,
                active: false
            },
            {
                id: 2,
                active: false
            },
            {
                id: 3,
                active: false
            },
            {
                id: 4,
                active: false
            }
        ];
    };

    useEffect( () => {
        setSquares(initSquares);
    }, []);

    return (
        <div>
            {squares ?
                squares.map(square => (
                    <Square square={square} onMove={movePlayer} />
                )) : null}
        </div>
    );
};

export default CombatField;