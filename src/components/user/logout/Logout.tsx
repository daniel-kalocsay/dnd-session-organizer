import React, {useContext, useEffect} from "react";
import {MDBBtn} from "mdbreact";
import {FirebaseContext} from "../../contexts/FirebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

const Logout: React.FC = () => {
    const auth = useContext(FirebaseContext)!.auth;
    const [user] = useAuthState(auth);
    // const [user, initializing, error] = useAuthState(auth); //TODO make sure destructuring user is enough

    const logOut = (event: React.SyntheticEvent) => {
        auth.signOut().then(() => {
            console.log("user signed out");
        });
    };

    //TODO use some sort of UserProfile component for showing and managing
    // user state instead of separate Login/Logout/Register components

    if (user)
        return (
            <MDBBtn onClick={logOut}>Log Out</MDBBtn>
        );

    return <div></div>;
};

export default Logout;
