import React, { useContext, useEffect, useState } from "react";
import { MDBBtn } from "mdbreact";
import { FirebaseContext } from "../contexts/FirebaseContext";

const Logout: React.FC = () => {
  const [isUserLoggedIn, setUserStatus] = useState(false);

  const auth = useContext(FirebaseContext)!.auth();

  const userStatusListener = () => {
    auth.onAuthStateChanged((user: any) => {
      setUserStatus(user);
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
      {isUserLoggedIn ? <MDBBtn onClick={handleClick}>Log Out</MDBBtn> : ""}
    </div>
  );
};

export default Logout;
