import React from "react";
import {Link, Route} from "react-router-dom";
import {MDBNavbar} from "mdbreact";
import { AppBar, Toolbar } from "@material-ui/core"
import UserInfo from "../user/UserInfo";
import WithAuth from "../../wrappers/WithAuth";

const Navbar = () => {
    return (
        <MDBNavbar position={"static"}>
            <Link to={"/"}>Home</Link>

            <Link to={"/combat"}>Combat grid</Link>

            <Link to={"/new-combat-field"}>Create new combat field</Link>
            
            <UserInfo />

        </MDBNavbar>
    )
};

export default Navbar;

//TODO make navbar a grid