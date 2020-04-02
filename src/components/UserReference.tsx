import React, { useState, useEffect } from 'react';
import { UserInfo } from './UserSearch';

const UserReference = (props: any) => {
    const [user, setUser] = useState<UserInfo>(props.userData);

    const handleClick = () => {
        console.log(`Adding player: ${user.name}`);
        props.onAddPlayer(user)
    };

    useEffect(() => {
        setUser(props.userData);
    }, [props]);

    return (
        <div>
            <h3 onClick={handleClick}>{user?.name}</h3>
        </div>
    )
};

export default UserReference;
