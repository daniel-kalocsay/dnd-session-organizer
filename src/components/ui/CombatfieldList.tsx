import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserInfo from "../../model/UserInfo";
import CombatfieldData from "../../model/CombatfieldData";
import { Button } from "@material-ui/core";
import CombatFieldListProps from "../../model/CombatFieldListProps";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { SelectedCampaignContext } from "../contexts/SelectedCampaignContext";

const CombatfieldList = (props: CombatFieldListProps) => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;
    const campaignDetails = useContext(SelectedCampaignContext);

    const handleClick = (combatfieldId: string) => {
        campaignsRef
            .doc(props.campaignId)
            .collection("combatfields")
            .doc(combatfieldId)
            .delete();
    };

    return (
        <div id="combatfield-list">
            <h2>Combatfields:</h2>
            {props.combatfields && campaignDetails!.campaignId !== ""
                ? props.combatfields.map((combatfield: CombatfieldData) => (
                      <div>
                          <Link
                              to={{
                                  pathname: "/combat",
                                  search: `?id=${combatfield.uid}`,
                                  // TODO: use context!
                                  state: {
                                      campaignId: campaignDetails!.campaignId,
                                      combatfieldData: combatfield,
                                      players: campaignDetails!.players,
                                  },
                              }}
                              key={combatfield.uid}
                          >
                              {combatfield.name}
                          </Link>
                          <Button onClick={() => handleClick(combatfield.uid)}>
                              Delete
                          </Button>
                          <br />
                      </div>
                  ))
                : ""}
        </div>
    );
};

export default CombatfieldList;
