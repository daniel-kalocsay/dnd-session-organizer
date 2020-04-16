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

      <Link to={"/my-campaigns"}>My Campaigns</Link>

      <Link to={"/new-campaign"}>Create new Campaign</Link>

      <UserInfo />
    </MDBNavbar>
  );
};

export default Navbar;
