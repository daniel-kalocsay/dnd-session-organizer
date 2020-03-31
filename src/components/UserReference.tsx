import React, { useState, useEffect } from 'react';
import { UserInfo } from './UserSearch';

export const UserReference = (props: any) => {
    const [user, setUser] = useState<UserInfo>(props.userData);

    const handleClick = () => {
        
    }

    useEffect(() => {
        setUser(props.userData);
    }, [props]);

    return (
        <div>
            <p onClick={handleClick}>{user?.name}</p>
        </div>
    )
}
