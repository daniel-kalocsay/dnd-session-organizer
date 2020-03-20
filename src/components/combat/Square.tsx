import React, {useEffect, useState} from "react";

const Square = (props: any) => {

    const [square, setSquare] = useState(props.square);

    const handleClick = () => {
        props.onMove(square.id);
    };

    useEffect(() => {
        setSquare(props.square)
    }, [props.square]);

    return (
        <div style={style.square}>
            <div style={square.active ? style.active : style.inactive} onClick={handleClick}>tile</div>
        </div>
    )
};

export default Square;

const style = {
    square: {
        border: "2px solid black"
    },
    active: {
        backgroundColor: "red"
    },
    inactive: {
        backgroundColor: "white"
    }
};
