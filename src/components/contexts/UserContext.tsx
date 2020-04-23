import React, {createContext, useState} from "react";

export interface UserContextInterface {
    isUserLoggedIn: boolean;
    setUserStatus: any;
}

export const UserContext = createContext<UserContextInterface | null>(null);

export const UserProvider = (props: any) => {
    const [isUserLoggedIn, setUserStatus] = useState(false);

    const userHandler: UserContextInterface = {
        isUserLoggedIn,
        setUserStatus
    };

    return (
        <div>
            <UserContext.Provider value={userHandler}>
                {props.children}
            </UserContext.Provider>
        </div>
    );
};
