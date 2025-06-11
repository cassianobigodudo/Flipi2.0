import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usuarioID, setUsuarioID] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const savedUserId = localStorage.getItem('userId');
        const savedUserInfo = localStorage.getItem('userInfo');
        
        if (savedUserId) {
            setUsuarioID(parseInt(savedUserId));
            setIsLoggedIn(true);
            console.log('Usuário recuperado:', savedUserId);
            
            if (savedUserInfo) {
                setUserInfo(JSON.parse(savedUserInfo));
            }
        }
    }, []);

    const loginUser = (id, userData = null) => {
        console.log('Login realizado com ID:', id);
        
        setUsuarioID(id);
        setIsLoggedIn(true);
        
        localStorage.setItem('userId', id.toString());
        
        if (userData) {
            setUserInfo(userData);
            localStorage.setItem('userInfo', JSON.stringify(userData));
        }
    };

    const logoutUser = () => {
        setUsuarioID(null);
        setUserInfo(null);
        setIsLoggedIn(false);
        
        localStorage.removeItem('userId');
        localStorage.removeItem('userInfo');
    };

    return (
        <UserContext.Provider value={{
            usuarioID,
            userInfo,
            isLoggedIn,
            loginUser,
            logoutUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser deve ser usado dentro de UserProvider');
    }
    return context;
};