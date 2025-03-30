import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/auth/login", { email, password });
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setUser(response.data.role);
            return true;
        } catch (error) {
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
