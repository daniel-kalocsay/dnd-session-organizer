import React from "react";
import HomePage from "../HomePage";
import Register from "../user/register/Register";
import Login from "../user/login/Login";
import Logout from "../user/logout/Logout";
import {Link, Route} from "react-router-dom";
import {MDBContainer, MDBNavbar} from "mdbreact";
import User from "../user/User";

const Navbar = () => {
    return (
        <MDBNavbar>
            <Link to={"/"}>Home</Link>
            <Link to={"/combat"}>Combat grid</Link>
            <User />
        </MDBNavbar>
    )
};

export default Navbar;