import React from 'react';
import {MDBBtn} from "mdbreact";

const Logout: React.FC = () => {
    const firebase = require("firebase");
    const auth = firebase.auth();

    const handleClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        auth.signOut().then(() => {
            console.log("user signed out")
        })
    }

    return (
        <div>
            <MDBBtn onClick={handleClick}>Log Out</MDBBtn>
        </div>
    )
}

export default Logout;
