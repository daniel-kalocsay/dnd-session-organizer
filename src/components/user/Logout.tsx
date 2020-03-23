import React, { useContext, useEffect } from "react";
import { MDBBtn } from "mdbreact";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { UserContext } from "../contexts/UserContext";

const Logout: React.FC = () => {
  const auth = useContext(FirebaseContext)!.auth();
  const userInfo = useContext(UserContext);

  //TODO where to put this listener function?
  const userStatusListener = () => {
    auth.onAuthStateChanged((user: any) => {
      userInfo!.setUserStatus(user ? true : false);
    });
  };

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    auth.signOut().then(() => {
      console.log("user signed out");
    });
  };

  useEffect(() => {
    userStatusListener();
  }, []);

  return (
    <div>
      {userInfo!.isUserLoggedIn ? <MDBBtn onClick={handleClick}>Log Out</MDBBtn> : ""}
    </div>
  );
};

export default Logout;
