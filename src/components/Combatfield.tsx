import React, {useState, useEffect} from "react";
import Square from "./Square";
//import uuid from "react-uuid";

const Combatfield = () => {
    const [squares, setSquares] = useState([] as any[]);

    const firebase = require("firebase");

    const playerPosition = firebase
        .database()
        .ref()
        .child("grid");

    const movePlayer = (id: any) => {
        console.log(squares);

        squares.forEach(square => {
            square.active = square.id === id;
        });

        console.log(squares);


        setSquares(squares);
    };

    useEffect(() => {
        //TODO use proper TS classes
        const newSquares: any = [
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
        setSquares(squares => [...newSquares]);
    }, []);

    return (
        <div>
            {squares ?
                squares.map(square => (
                    <Square id={square.id} onMove={movePlayer} active={square.active} />
                )) : null}
        </div>
    );
};

export default Combatfield;