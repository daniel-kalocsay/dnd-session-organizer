import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserInfo from "../../model/UserInfo";
import CombatfieldData from "../../model/CombatfieldData";
import { Button } from "@material-ui/core";
import CombatFieldListProps from "../../model/CombatFieldListProps";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { SelectedCampaignContext } from "../contexts/SelectedCampaignContext";

const CombatfieldList = () => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const campaignDetails = useContext(SelectedCampaignContext);

    const handleClick = (combatfieldId: string) => {
        campaignsRef
            .doc(campaignDetails!.campaignId)
            .collection("combatfields")
            .doc(combatfieldId)
            .delete();
    };

    return (
        <div id="combatfield-list" style={styles.mainWrapper}>

            <h2 style={styles.title}>
                Combatfields
            </h2>

            <div style={styles.listContainer}>
                {campaignDetails!.combatfields && campaignDetails!.campaignId !== ""
                    ? campaignDetails!.combatfields.map(
                        (combatfield: CombatfieldData) => (
                            <div key={combatfield.uid} style={styles.combatfieldInfo}>
                                <div style={styles.fieldName}>
                                    {/*//TODO little card divs instead of buttons/links*/}

                                    {/*<Button color={"primary"} variant={"outlined"}>*/}
                                        <Link
                                            to={{
                                                pathname: "/combat",
                                                search: `?id=${combatfield.uid}`,
                                                // TODO: use context?
                                                state: {
                                                    campaignId: campaignDetails!
                                                        .campaignId,
                                                    combatfieldData: combatfield,
                                                    DMName: campaignDetails?.DM.name,
                                                    DMId: campaignDetails?.DM.uid,
                                                    players: campaignDetails!.players,
                                                },
                                            }}
                                            key={combatfield.uid}
                                        >
                                            {combatfield.name}
                                        </Link>
                                    {/*</Button>*/}
                                </div>

                                <div style={styles.fieldSize}>
                                    {/*//TODO store size in db and in CombatfieldData model class */}
                                    Size: null :(
                                </div>

                                <div style={styles.fieldDelete}>
                                    <Button
                                        color={"secondary"}
                                        variant={"outlined"}
                                        onClick={() => handleClick(combatfield.uid)}
                                    >
                                        Delete
                                    </Button>
                                </div>

                            </div>
                        )
                    )
                    : ""}
            </div>

            <div style={styles.createNewButton}>
                {/*//TODO not sure if this really should be on a separate page, seems it would fit better here*/}
                <Link
                    to={{
                        pathname: "/new-combatfield",
                        state: {campaignId: campaignDetails!.campaignId},
                    }}
                >
                    <Button color={"primary"} variant={"outlined"}>Create new Combatfield</Button>
                </Link>
            </div>

        </div>
    );
};

export default CombatfieldList;

const styles = {
    mainWrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
        gridGap: "1em",
        padding: "1em"
    },
    title: {
        border: "1px solid black",
        gridColumn: "1/3",
        gridRow: "1/2"
    },
    listContainer: {
        border: "1px solid black",
        gridColumn: "1/3",
        gridRow: "2/5"
    },
    createNewButton: {
        border: "1px solid black",
        gridColumn: "1/3",
        gridRow: "5/6"
    },
    combatfieldInfo: {
        border: "1px solid black",
        display: "grid",
        padding: "0.2em",
        gridTemplateColumns: "repeat(3, 1fr)"
    },
    fieldName: {
        gridColumn: "1/3"
    },
    fieldSize: {
        gridColumn: "3/4"
    },
    fieldDelete: {
        gridColumn: "4/5"
    }
};
