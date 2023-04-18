import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext();

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState('');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios
            .post('/verify-token', {}, { withCredentials: true })
            .then((respone) => {
                setUserInfo(respone.data.data.username);
            })
            .catch((e) => {
                setUserInfo(null);
            });
    }, []);

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                searchValue,
                setSearchValue
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
