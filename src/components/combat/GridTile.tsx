import React, { useEffect, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../util/Items";

const GridTile = (props: any) => {
    const [{ isDragging }, connectDrag] = useDrag({
        item: {
            type: ItemTypes.GRIDTILE,
            occupied_by: props.tile.occupied_by,
            uid: props.tile.uid,
            x: props.tile.x,
            y: props.tile.y,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, connectDrop] = useDrop({
        accept: ItemTypes.GRIDTILE,
        // hover(item) {
        //     console.log("hover");
        // },
        drop: (item) => props.movePlayer(item, props.tile),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            style={
                props.tile.occupied_by !== "" ? styles.active : styles.inactive
            }
            ref={props.player !== "" ? connectDrag : connectDrop}
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
