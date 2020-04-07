import React from "react";

import UserInfo from "../../model/UserInfo";
import UserReference from "./UserReference";

const UserList = (props: any) => {
  return (
    <div>
      {props.users.map((user: UserInfo) => (
        <UserReference
          key={user.uid!}
          onUserClick={props.onUserClick}
          userData={user}
        />
      ))}
    </div>
  );
};

export default UserList;
