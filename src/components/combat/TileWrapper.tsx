import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../util/Items";
import GridTile from "./GridTile";

export const TileWrapper = (props: any) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.GRIDTILE, occupied_by: props.player },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.GRIDTILE,
        hover(item, monitor) {
            console.log("hover");
        },
        drop: () => console.log("dropped"),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            style={
                props.tile.occupied_by !== "" ? styles.active : styles.inactive
            }
        >
            <GridTile
                id={props.tile.uid}
                tile={props.tile}
                player={props.getPlayerName(props.tile)}
            />
        </div>
    );
};

const styles = {
    tile: {
        //TODO resolve styling of tiles, use active/inactive to change color
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
