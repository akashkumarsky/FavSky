import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../../config/api";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    jwt: localStorage.getItem("jwt"),
    isAuthenticated: localStorage.getItem("jwt") ? true : false,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile(token);
    }
  }, []);

  const getUserProfile = async (token) => {
    try {
      const response = await api.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        user: response.data,
      }));
    } catch (error) {
      console.error("Error fetching user profile:", error);
      logout();
    }
  };

  const login = async (userData) => {
    try {
      const response = await api.post("/auth/signin", userData);
      const { jwt } = response.data;
      localStorage.setItem("jwt", jwt);
      await getUserProfile(jwt);
    } catch (error) { // <-- Braces added here
      console.error("Login error:", error); // <-- 'console' is now lowercase
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/auth/signup", userData);
      const { jwt } = response.data;
      localStorage.setItem("jwt", jwt);
      await getUserProfile(jwt);
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setAuthState({
      jwt: null,
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};