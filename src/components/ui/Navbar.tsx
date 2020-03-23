import React from "react";
import HomePage from "../HomePage";
import Registration from "../user/Registration";
import Login from "../user/Login";
import Logout from "../user/Logout";
import {Route} from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <HomePage />
            <Registration />
            <Login />
            <Logout />
        </div>
    )
};

export default Navbar;