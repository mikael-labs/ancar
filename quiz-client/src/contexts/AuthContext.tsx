import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { authService } from "../services/AuthService/AuthService";
import { LoginRequest } from "../services/AuthService/requests";
import { UserData } from "./types";

export type TAuthContext = {
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
  token: string | null;
  userData: UserData | null;
};

export const AuthContext = createContext({} as TAuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem("ancar:access-token"));

  const navigate = useNavigate();

  const userData: UserData | null = useMemo(() => {
    if (!token) return null;

    return jwtDecode<UserData>(token);
  }, [token]);

  useEffect(() => {
    if (token) sessionStorage.setItem("ancar:access-token", token);
    else sessionStorage.removeItem("ancar:access-token");
  }, [token]);

  const login = useCallback((request: LoginRequest) => {
    return authService.login(request).then(({ token }) => {
      setToken(token);
      navigate("/quizzes");
    });
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  return <AuthContext.Provider value={{ login, logout, token, userData }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuthContext hook must be used inside a AuthContextProvider!");

  return context;
};
