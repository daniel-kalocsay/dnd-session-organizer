import React from "react";

import UserInfo from "../../model/UserInfo";

interface userClickable {
    key: string;
    userData: UserInfo;
    onUserClick?: (userData: UserInfo) => void;
}

const UserReference = (props: userClickable) => {
    //TODO how to do it without checking this at every click?
    const handleClick = () => {
        if (props.onUserClick) {
            props.onUserClick(props.userData);
        }
    };

    return (
        <div>
            <h4 onClick={handleClick}>{props.userData.name}</h4>
        </div>
    );
};

export default UserReference;
