import React from "react";
import { Link, Route } from "react-router-dom";

import { MDBNavbar } from "mdbreact";
import UserProfile from "../user/UserProfile";

// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";

const Navbar = () => {
  return (
    <MDBNavbar position={"static"}>
      <Link to={"/"}>Home</Link>

      <Link to={"/my-campaigns"}>My Campaigns</Link>

      <Link to={"/my-profile"}>My profile</Link>

      <UserProfile />
    </MDBNavbar>
  );
};

export default Navbar;
