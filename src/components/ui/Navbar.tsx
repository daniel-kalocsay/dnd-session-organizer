import React from "react";
import { Link, Route } from "react-router-dom";

import { MDBNavbar } from "mdbreact";
import UserInfo from "../user/UserProfile";

//TODO make navbar a grid, and with MUI components instead

// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";

const Navbar = () => {
  return (
    <MDBNavbar position={"static"}>
      <Link to={"/"}>Home</Link>

      <Link to={"/my-sessions"}>My Sessions</Link>

      <Link to={"/new-session"}>Create new session</Link>

      <UserInfo />
    </MDBNavbar>
  );
};

export default Navbar;
