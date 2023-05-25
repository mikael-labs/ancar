import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

http.interceptors.response.use((response) => response.data ?? response);
http.interceptors.request.use((config) => {
  config.headers = config.headers.set("Authorization", `Bearer ${sessionStorage.getItem("ancar:access-token")}`);
  return config;
});

export { http };

export default http;
