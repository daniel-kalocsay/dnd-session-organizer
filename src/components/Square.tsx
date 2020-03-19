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
            <div style={square.active ? style.active : style.inactive} onClick={handleClick}>asd</div>
        </div>
    )
};

export default Square;

const style = {
    square: {
        width: 100,
        height: 100,
        border: "3px solid black"
    },
    active: {
        backgroundColor: "red"
    },
    inactive: {
        backgroundColor: "white"
    }
};
