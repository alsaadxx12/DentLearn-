import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('dentlearn-user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('dentlearn-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('dentlearn-user');
        }
    }, [user]);

    const login = (userData) => setUser(userData);

    const logout = () => setUser(null);

    const isLoggedIn = !!user;
    const isSeller = user?.role === 'seller';

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn, isSeller }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
