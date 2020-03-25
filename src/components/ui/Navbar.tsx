import React from "react";
import {Link, Route} from "react-router-dom";
import {MDBContainer, MDBNavbar} from "mdbreact";
import UserProfile from "../user/UserProfile";

const Navbar = () => {
    return (
        <MDBNavbar>
            <Link to={"/"}>Home</Link>
            <Link to={"/combat"}>Combat grid</Link>
            <UserProfile />
        </MDBNavbar>
    )
};

export default Navbar;