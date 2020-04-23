import React, { createContext, useState } from "react";

export interface CampaignContextInterface {
    campaignId: string;
    setId: any;
}

export const SelectedCampaignContext = createContext<CampaignContextInterface | null>(
    null
);

export const SelectedCampaignProvider = (props: any) => {
    const [campaignId, setId] = useState("" as string);

    const campaignHandler: CampaignContextInterface = {
        campaignId,
        setId,
    };

    return (
        <SelectedCampaignContext.Provider value={campaignHandler}>
            {props.children}
        </SelectedCampaignContext.Provider>
    );
};
