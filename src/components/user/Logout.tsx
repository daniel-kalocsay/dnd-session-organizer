import React, {useContext} from 'react';
import {MDBBtn} from "mdbreact";
import { FirebaseContext } from "../contexts/FirebaseContext";

const Logout: React.FC = () => {
    const auth = useContext(FirebaseContext)!.auth();

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
