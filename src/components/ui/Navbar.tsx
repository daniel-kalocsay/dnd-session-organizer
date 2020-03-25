import React from "react";
import {Link, Route} from "react-router-dom";
import {MDBContainer, MDBNavbar} from "mdbreact";
import UserInfo from "../user/UserInfo";

const Navbar = () => {
    return (
        <MDBNavbar>
            <Link to={"/"}>Home</Link>
            <Link to={"/combat"}>Combat grid</Link>
            <UserInfo />
        </MDBNavbar>
    )
};

export default Navbar;

//TODO make navbar a grid