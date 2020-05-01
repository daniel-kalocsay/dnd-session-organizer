import React from "react";
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

    const [{ isOver }, connectDrop] = useDrop({
        accept: ItemTypes.GRIDTILE,
        drop: (item) => props.movePlayer(item, props.tile),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const chooseStyle = () => {
        if (props.tile.occupied_by === "") {
            if (isOver) {
                return styles.hovered;
            }
            return styles.inactive;
        } else {
            if (isDragging) {
                return styles.dragged;
            } else {
                return styles.active;
            }
        }
    };

    const chooseRef = () => {
        if (props.playerOnTile === "") {
            return connectDrop;
        } else {
            if (props.IamTheDM || props.tile.occupied_by === props.user) {
                return connectDrag;
            }
        }
    };

    return (
        <div style={chooseStyle()} ref={chooseRef()}>
            {props.playerOnTile}
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
        border: "2px solid black",
        backgroundColor: "red",
        opacity: "0.5",
    },
    hovered: {
        border: "2px solid black",
        backgroundColor: "yellow",
    },
};
