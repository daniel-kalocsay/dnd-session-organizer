import React, {useEffect, useState} from "react";

const GridTile = (props: any) => {

    const [square, setSquare] = useState(props.tile);

    useEffect(() => {
        setSquare(props.tile)
    }, [props.tile]);

    return (
        <div style={styles.tile}>
            <div style={square.active ? styles.active : styles.inactive} >{props.player}</div>
        </div>
    )
};

export default GridTile;

const styles = {
    tile: {
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
