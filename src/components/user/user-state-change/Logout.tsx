import React, {useContext, useEffect} from "react";
import {MDBBtn} from "mdbreact";
import {FirebaseContext} from "../../contexts/FirebaseContext";

const Logout: React.FC = () => {
    const auth = useContext(FirebaseContext)!.auth;

    const logOut = (event: React.SyntheticEvent) => {
        auth.signOut().then(() => {
            console.log("user signed out");
        });
    };

    return (
        <MDBBtn onClick={logOut}>Log Out</MDBBtn>
    );

};

export default Logout;
