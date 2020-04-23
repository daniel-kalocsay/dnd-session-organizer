import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserInfo from "../../model/UserInfo";
import CombatfieldData from "../../model/CombatfieldData";
import { Button } from "@material-ui/core";
import CombatFieldListProps from "../../model/CombatFieldListProps";
import { FirebaseContext } from "../contexts/FirebaseContext";

const CombatfieldList = (props: CombatFieldListProps) => {
    const campaignsRef = useContext(FirebaseContext)!.campaignsRef;

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
            {props.combatfields && props.campaignId !== ""
                ? props.combatfields.map((combatfield: CombatfieldData) => (
                      <div>
                          <Link
                              to={{
                                  pathname: "/combat",
                                  search: `?id=${combatfield.uid}`,
                                  state: {
                                      campaignId: props.campaignId,
                                      combatfieldData: combatfield,
                                      players: props.players,
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
        // <div id="combatfield-list">
        //     <h2>Combatfields:</h2>
        //     {props.combatfields
        //         ? props.combatfields.map((combatfield: CombatfieldData) => (
        //               <div>
        //                   <Link
        //                       to={`/combat?id=${combatfield.uid}`}
        //                       key={combatfield.uid}
        //                   >
        //                       {combatfield.name}
        //                   </Link>
        //                   <Button onClick={() => handleClick(combatfield.uid)}>
        //                       Delete
        //                   </Button>
        //                   <br />
        //               </div>
        //           ))
        //         : ""}
        // </div>
    );
};

export default CombatfieldList;
