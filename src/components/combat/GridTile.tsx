import React, { useEffect, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../util/Items";

const GridTile = (props: any) => {
    const [square, setSquare] = useState(props.tile);
    const ref = useRef(null);

    const [{ isDragging }, connectDrag] = useDrag({
        item: {
            type: ItemTypes.GRIDTILE,
            occupied_by: props.player,
            index: props.tile.uid,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, connectDrop] = useDrop({
        accept: ItemTypes.GRIDTILE,

        hover(item) {
            console.log(item);
        },

        drop: () => console.log("dropped"),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    useEffect(() => {
        setSquare(props.tile);
    }, [props.tile]);

    connectDrag(ref);
    connectDrop(ref);

    return (
        <div
            style={
                props.tile.occupied_by !== "" ? styles.active : styles.inactive
            }
            //style={isDragging ? styles.dragged : styles.tile}
            //ref={props.player !== "" ? drag : drop}
            ref={ref}
        >
            {props.player}
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
        border: "2px solid black",
        backgroundColor: "red",
    },
    inactive: {
        border: "2px solid black",
        backgroundColor: "lightgreen",
    },
    dragged: {
        opacity: "0.5",
    },
};
