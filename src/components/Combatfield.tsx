import React, { useState, useEffect } from "react";
import Square from "./Square";
//import uuid from "react-uuid";

const Combatfield = () => {
  const squares2: any[] = [];
  const [squares, setSquares] = useState(squares2);

  const firebase = require("firebase");

  const playerPosition = firebase
    .database()
    .ref()
    .child("grid");

  const movePlayer = () => {};

  useEffect(() => {
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
      {squares
        ? squares.map(square => <Square key={square.id} onClick={movePlayer} />)
        : null}
    </div>
  );
};

export default Combatfield;
