import React, { useState, useEffect } from "react";
import Square from "./Square";
//import uuid from "react-uuid";

const CombatField = () => {
  const [squares, setSquares] = useState([] as any[]);

  const firebase = require("firebase");

  const grid = firebase
    .database()
    .ref()
    .child("grids");

  const movePlayer = (id: any) => {
    let newSquares = squares.map(square => {
      return { id: square.id, active: square.id === id };
    });

    setSquares(newSquares);
  };

  const initSquares = () => {
    grid
      .child("grid1")
      .child("tiles")
      .on("value", (snapshot: any) => {
        let startingSquares = []

        for (let tile in snapshot.val()) {
            startingSquares.push(snapshot.val()[tile])
        }
        setSquares(startingSquares);
      });
  };

  useEffect(() => {
    initSquares();
  }, []);

  return (
    <div>
      {squares
        ? squares.map(square => <Square square={square} onMove={movePlayer} />)
        : null}
    </div>
  );
};

export default CombatField;
