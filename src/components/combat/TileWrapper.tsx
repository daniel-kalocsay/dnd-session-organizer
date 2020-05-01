import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../util/Items";
import GridTile from "./GridTile";

export const TileWrapper = (props: any) => {
    const ref = useRef(null);

    const [{ isOver }, connectDrop] = useDrop({
        accept: ItemTypes.GRIDTILE,

        hover(item) {
            console.log(item);
        },

        drop: () => console.log("dropped"),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    connectDrop(ref);

    return (
        <div
            ref={ref}
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
