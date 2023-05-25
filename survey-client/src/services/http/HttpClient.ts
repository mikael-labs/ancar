import { AxiosInstance } from "axios";
import http from "./axios/http";

export interface HttpClientOptions {
  headers?: Record<string, any>;
  query?: Record<any, any>;
  abortSignal?: AbortSignal;
}

export interface HttpClient {
  get<T>(url: string, options?: HttpClientOptions): Promise<T>;
  post<T, Body = any>(url: string, body?: Body, options?: HttpClientOptions): Promise<T>;
  patch<T, Body = any>(url: string, body?: Body, options?: HttpClientOptions): Promise<T>;
  put<T, Body = any>(url: string, body?: Body): Promise<T>;
  delete<T>(url: string): Promise<T>;
  addResponseInterceptor<Error>(onFullFilled: (response: any) => any, onRejected: (error: Error) => any): () => void;
}

class AxiosHttpClient implements HttpClient {
  constructor(private _axiosInstance: AxiosInstance) {}

  addResponseInterceptor<Error>(onFullFilled: (response: any) => any, onRejected: (error: Error) => any): () => void {
    const interceptorId = this._axiosInstance.interceptors.response.use(onFullFilled, onRejected);

    return () => this._axiosInstance.interceptors.response.eject(interceptorId);
  }

  patch<T, Body = any>(url: string, body?: Body | undefined, options?: HttpClientOptions | undefined): Promise<T> {
    return this._axiosInstance.patch(url, body, options) as Promise<T>;
  }

  get<T>(url: string, { query, headers, abortSignal }: HttpClientOptions = {}) {
    return this._axiosInstance.get<T>(url, {
      signal: abortSignal,
      headers,
      params: query,
      paramsSerializer: (params: any) => {
        const paramsStrings = Object.entries(params).map(([key, value]) => {
          if (value instanceof Date) return `${key}=${value.toISOString()}`;
          else if (value instanceof Array) return value.map((arrValue) => `${key}=${arrValue}`).join("&");
          else if (typeof value === "object") return `${key}=${JSON.stringify(value)}`;
          else if (value === undefined) return "";
          else return `${key}=${value}`;
        });

        const existentParamsString = paramsStrings.filter((v) => !!v);
        const queryString = existentParamsString.join("&");

        return queryString;
      },
    }) as Promise<T>;
  }

  put<T, Body>(url: string, body?: Body) {
    return this._axiosInstance.put<T>(url, body) as Promise<T>;
  }

  post<T, Body>(url: string, body?: Body) {
    return this._axiosInstance.post<T>(url, body) as Promise<T>;
  }

  delete<T>(url: string) {
    return this._axiosInstance.delete<T>(url) as Promise<T>;
  }
}

export const httpClient: HttpClient = new AxiosHttpClient(http);
