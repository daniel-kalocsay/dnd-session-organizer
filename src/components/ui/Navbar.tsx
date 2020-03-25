import React from "react";
import HomePage from "../HomePage";
import Register from "../user/register/Register";
import Login from "../user/login/Login";
import Logout from "../user/logout/Logout";
import {Link, Route} from "react-router-dom";
import {MDBContainer, MDBNavbar} from "mdbreact";

const Navbar = () => {
    return (
        <MDBNavbar>
            <Link to={"/"}>Home</Link>
            <Link to={"/combat"}>Combat grid</Link>
            <Register/>
            <Login/>
            <Logout/>
        </MDBNavbar>
    )
};

export default Navbar;