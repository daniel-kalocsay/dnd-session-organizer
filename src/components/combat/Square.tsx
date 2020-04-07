import React, {useEffect, useState} from "react";

const Square = (props: any) => {

    const [square, setSquare] = useState(props.square);

    useEffect(() => {
        setSquare(props.square)
    }, [props.square]);

    return (
        <div style={styles.square}>
            <div style={square.active ? styles.active : styles.inactive} ></div>
        </div>
    )
};

export default Square;

const styles = {
    square: {
        // overflow: "auto",
        // height: "100%",
    },
    active: {
        backgroundColor: "red"
    },
    inactive: {
        backgroundColor: "white"
    }
};
