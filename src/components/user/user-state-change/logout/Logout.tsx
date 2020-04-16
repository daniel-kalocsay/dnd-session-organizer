import React, { useContext } from "react";

import { FirebaseContext } from "../../../contexts/FirebaseContext";

import Button from "@material-ui/core/Button";

const Logout: React.FC = () => {
    const auth = useContext(FirebaseContext)!.auth;

    const logOut = () => {
        auth.signOut().then(() => {
            console.log("user signed out");
        });
    };

    return (
        <Button variant={"contained"}
                color={"primary"}
                onClick={logOut}
        >
            Log out
        </Button>
    );

};

export default Logout;
