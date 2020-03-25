import React from "react";
import HomePage from "../HomePage";
import Register from "../user/user-state-change/Register";
import Login from "../user/user-state-change/Login";
import Logout from "../user/user-state-change/Logout";
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