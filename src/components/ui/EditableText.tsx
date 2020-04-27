import React, { useState, useContext, useEffect, useRef } from "react";
import { SelectedCampaignContext } from "../contexts/SelectedCampaignContext";

export const EditableText = () => {
    const campaignDetails = useContext(SelectedCampaignContext);

    const inputRef = useRef(null);
    const [inputVisible, setInputVisible] = useState(false);

    useEffect(() => {
        // Handle outside clicks on mounted state
        if (inputVisible) {
            document.addEventListener("mousedown", onClickOutside);
        }

        // This is a necessary step to "dismount" unnecessary events when we destroy the component
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    });

    const onClickOutside = (e: any) => {
        // Check if user is clicking outside of <input>
        if (inputRef.current) {
            let input = inputRef.current as any;
            if (!input.contains(e.target)) {
                setInputVisible(false);
            }
        }
    };

    return (
        <div>
            {inputVisible ? (
                <input
                    ref={inputRef}
                    value={campaignDetails!.campaignName}
                    onChange={(e) => {
                        campaignDetails!.setName(e.target.value);
                    }}
                />
            ) : (
                <span onClick={() => setInputVisible(true)}>
                    {campaignDetails!.campaignName}
                </span>
            )}
        </div>
    );
};
