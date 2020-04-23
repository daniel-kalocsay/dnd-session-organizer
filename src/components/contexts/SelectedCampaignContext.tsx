import React, { createContext, useState } from "react";
import UserInfo from "../../model/UserInfo";

export interface CampaignContextInterface {
    campaignId: string;
    setId: any;
    players: UserInfo[];
    setPlayers: any;
}

export const SelectedCampaignContext = createContext<CampaignContextInterface | null>(
    null
);

export const SelectedCampaignProvider = (props: any) => {
    const [campaignId, setId] = useState("" as string);
    const [players, setPlayers] = useState([] as UserInfo[]);

    const campaignHandler: CampaignContextInterface = {
        campaignId,
        setId,
        players,
        setPlayers,
    };

    return (
        <SelectedCampaignContext.Provider value={campaignHandler}>
            {props.children}
        </SelectedCampaignContext.Provider>
    );
};
