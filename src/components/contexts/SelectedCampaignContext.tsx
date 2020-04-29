import React, { createContext, useState } from "react";
import UserInfo from "../../model/UserInfo";
import CombatfieldData from "../../model/CombatfieldData";

export interface CampaignContextInterface {
    campaignId: string;
    setId: any;
    campaignName: string;
    setName: any;
    DM: string;
    setDM: any;
    players: UserInfo[];
    setPlayers: any;
    combatfields: CombatfieldData[];
    setCombatFields: any;
}

export const SelectedCampaignContext = createContext<CampaignContextInterface | null>(
    null
);

export const SelectedCampaignProvider = (props: any) => {
    const [campaignId, setId] = useState("" as string);
    const [campaignName, setName] = useState("" as string);
    const [DM, setDM] = useState("" as string);
    const [players, setPlayers] = useState([] as UserInfo[]);
    const [combatfields, setCombatFields] = useState([] as CombatfieldData[]);

    const campaignHandler: CampaignContextInterface = {
        campaignId,
        setId,
        campaignName,
        setName,
        DM,
        setDM,
        players,
        setPlayers,
        combatfields,
        setCombatFields,
    };

    return (
        <SelectedCampaignContext.Provider value={campaignHandler}>
            {props.children}
        </SelectedCampaignContext.Provider>
    );
};
