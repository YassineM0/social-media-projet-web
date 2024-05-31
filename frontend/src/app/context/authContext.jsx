"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedId = localStorage.getItem("authId");
    if (storedToken) {
      setToken(storedToken);
      setUserId(storedId);
    }
  }, []);
  const login = (id, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authId", id);
    setUserId(id);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    //localStorage.removeItem("userInfo");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
