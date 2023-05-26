import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { AxiosError, HttpStatusCode } from "axios";

import { httpClient } from "./services/http/HttpClient";
import { routes } from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  const content = useRoutes(routes);
  const toast = useToast();

  useEffect(() => {
    const removeInterceptor = httpClient.addResponseInterceptor(
      (response) => response,
      (error: AxiosError<{ message: string; status: HttpStatusCode }>) => {
        toast({ title: error.response?.data.message, status: "error" });

        return Promise.reject(error);
      }
    );

    return removeInterceptor;
  }, [toast]);

  return <AuthContextProvider>{content}</AuthContextProvider>;
}

export default App;
