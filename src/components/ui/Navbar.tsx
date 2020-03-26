import React from "react";
import {Link, Route} from "react-router-dom";
import {MDBNavbar} from "mdbreact";
import { AppBar, Toolbar } from "@material-ui/core"
import UserInfo from "../user/UserInfo";

const Navbar = () => {
    return (
        <MDBNavbar position={"static"}>
            <Link to={"/"}>Home</Link>
            <Link to={"/combat"}>Combat grid</Link>
            <UserInfo />
        </MDBNavbar>
    )
};

export default Navbar;

//TODO make navbar a grid