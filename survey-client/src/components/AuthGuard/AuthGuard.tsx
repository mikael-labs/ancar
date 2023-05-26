import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const { userData } = useAuthContext();

  if (!userData) return <Navigate to="/" />;

  return <Outlet />;
};
