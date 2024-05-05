import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { decodeToken } from "react-jwt";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwttoken = localStorage.getItem("pptoken");
    if (jwttoken) {
      setToken(jwttoken);
      setIsLoggedIn(true);
      let decodedData = decodeToken(jwttoken);
      setUser(decodedData.user);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("pptoken", token);
    setToken(token);
    setIsLoggedIn(true);
    let decodedData = decodeToken(token);
    setUser(decodedData.user);
  };

  const logout = () => {
    localStorage.removeItem("pptoken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};
