import React from "react";
import UserReference from "./UserReference";
import UserInfo from "./UserInfo";

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
