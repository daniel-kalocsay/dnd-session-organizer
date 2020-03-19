import React, {useState} from "react";

const Square = (props: any) => {
    const [active, setActive] = useState(props.active);

    const handleClick = () => {
        console.log(`clicked in square ${props.id}`);
        props.onMove(props.id);
        setActive(true);
    };

    return (
        <div style={style.square}>
            <div style={active ? style.active : style.inactive} onClick={handleClick}>asd</div>
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
