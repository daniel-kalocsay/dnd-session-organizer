import React, { useState } from "react";

const Square = (props: any) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    //setActive(active);
  };

  return (
    <div style={style.square}>
      <div onClick={handleClick}></div>
    </div>
  );
};

export default Square;

const style = {
  square: {
    width: 100,
    height: 100,
    border: "3px solid black"
  },
  active: {
    color: "red"
  },
  inactive: {
    color: "white"
  }
};
