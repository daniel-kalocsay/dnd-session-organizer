import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../util/Items";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

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

    const handleClick = () => {
        if (props.IamTheDM && !props.tile.occupied_by) {
            props.modifyIcon(props.tile.uid, props.user);
        } else if (props.tile.occupied_by) {
            props.modifyIcon(props.tile.uid, "");
        }
    };

    return (
        <div style={chooseStyle()} ref={chooseRef()} onClick={handleClick}>
            <ContextMenuTrigger id={props.tile.uid}>
                <div>{props.playerOnTile}</div>
            </ContextMenuTrigger>

            <ContextMenu id={props.tile.uid}>
                <MenuItem onClick={handleClick} data={{ tile: props.tile }}>
                    <div style={styles.menu}>Delete</div>
                </MenuItem>
            </ContextMenu>
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
    menu: {
        backgroundColor: "blue",
        color: "white",
    },
};
