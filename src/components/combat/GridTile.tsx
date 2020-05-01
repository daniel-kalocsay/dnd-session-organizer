import React, { useEffect, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../util/Items";

const GridTile = (props: any) => {
    const [square, setSquare] = useState(props.tile);

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.GRIDTILE,
            occupied_by: props.player,
            index: props.tile.uid,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.GRIDTILE,
        hover(item, monitor) {
            console.log("dnd");
        },
    });

    useEffect(() => {
        setSquare(props.tile);
    }, [props.tile]);

    return (
        <div
            style={isDragging ? styles.dragged : styles.tile}
            //ref={props.player !== "" ? drag : drop}
            ref={drag}
        >
            <div style={square.active ? styles.active : styles.inactive}>
                {props.player}
            </div>
        </div>
    );
};

export default GridTile;

const styles = {
    tile: {
        // overflow: "auto",
        // height: "100%",
        opacity: "1.0",
    },
    active: {
        backgroundColor: "red",
    },
    inactive: {
        backgroundColor: "white",
    },
    dragged: {
        opacity: "0.5",
    },
};
