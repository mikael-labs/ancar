import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { authService } from "../services/AuthService/AuthService";
import { LoginRequest } from "../services/AuthService/requests";
import jwtDecode from "jwt-decode";
import { UserData } from "./types";

export type TAuthContext = {
  login: (request: LoginRequest) => void;
  logout: () => void;
  token: string | null;
  userData: UserData | null;
};

export const AuthContext = createContext({} as TAuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);

  const userData: UserData | null = useMemo(() => {
    if (!token) return null;

    return jwtDecode<UserData>(token);
  }, [token]);

  useEffect(() => {
    if (token) localStorage.setItem("ancar:access-token", token);
    else localStorage.removeItem("ancar:access-token");
  }, [token]);

  const login = useCallback((request: LoginRequest) => {
    authService.login(request).then(({ token }) => {
      setToken(token);
    });
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  return <AuthContext.Provider value={{ login, logout, token, userData }}>{children}</AuthContext.Provider>;
};
