import React from "react";
import UserSearch from "../user/UserSearch";
import Button from "@material-ui/core/Button";
import UserInfo from "../../model/UserInfo";

export const PlayerOptions = (props: any) => {
    return (
        <div>
            <h3>Add player to the campaign:</h3>
            <UserSearch />

            <h3>Players in the campaign:</h3>

            {props.players.length === 0 ? (
                <p>Loading players...</p>
            ) : (
                props.players.map((player: UserInfo) => (
                    <div key={player.uid!}>
                        <p>{player.name}</p>
                        <Button
                            onClick={() => {
                                props.deletePlayer(player.uid!);
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                ))
            )}
        </div>
    );
};
