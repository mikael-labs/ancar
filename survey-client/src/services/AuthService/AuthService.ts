import { HttpClient, httpClient } from "../http/HttpClient";
import { LoginRequest } from "./requests";
import { LoginResponse, RegisterRequest } from "./responses";

export interface AuthService {
  login(request: LoginRequest): Promise<LoginResponse>;
  register(request: RegisterRequest): Promise<void>;
}

class AuthServiceImpl implements AuthService {
  constructor(private _http: HttpClient) {}

  register(request: RegisterRequest): Promise<void> {
    return this._http.post("usuarios", request);
  }

  login(request: LoginRequest): Promise<LoginResponse> {
    return this._http
      .post("/auth/login", request)
      .then((res) => new Promise<any>((resolve) => setTimeout(() => resolve(res), 3000)));
  }
}

export const authService: AuthService = new AuthServiceImpl(httpClient);
