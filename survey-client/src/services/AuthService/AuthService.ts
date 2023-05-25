import { HttpClient, httpClient } from "../http/HttpClient";
import { LoginRequest } from "./requests";
import { LoginResponse } from "./responses";

export interface AuthService {
  login(request: LoginRequest): Promise<LoginResponse>;
}

class AuthServiceImpl implements AuthService {
  constructor(private _http: HttpClient) {}

  login(request: LoginRequest): Promise<LoginResponse> {
    return this._http
      .post("/auth/login", request)
      .then((res) => new Promise<any>((resolve) => setTimeout(() => resolve(res), 3000)));
  }
}

export const authService: AuthService = new AuthServiceImpl(httpClient);
