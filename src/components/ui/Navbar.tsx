import React from "react";
import HomePage from "../HomePage";
import Registration from "../user/Registration";
import Login from "../user/login/Login";
import Logout from "../user/Logout";
import {Link, Route} from "react-router-dom";
import {MDBContainer, MDBNavbar} from "mdbreact";

const Navbar = () => {
    return (
        <MDBNavbar>
            <Link to={"/"}>Home</Link>
            <Link to={"/combat"}>Combat grid</Link>
            <Registration/>
            <Login/>
            <Logout/>
        </MDBNavbar>
    )
};

export default Navbar;