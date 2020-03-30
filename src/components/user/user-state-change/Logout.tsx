import React, { useContext } from "react";
import { MDBBtn } from "mdbreact";
import { FirebaseContext } from "../../contexts/FirebaseContext";

const Logout: React.FC = () => {
    const auth = useContext(FirebaseContext)!.auth;

    const logOut = () => {
        auth.signOut().then(() => {
            console.log("user signed out");
        });
    };

    return (
        <MDBBtn onClick={logOut}> Log out </MDBBtn>
    );

};

export default Logout;
