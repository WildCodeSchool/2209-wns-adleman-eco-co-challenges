import { Navigate } from "react-router-dom";
import { UserContext } from "../AuthContext/AuthContext";
import { useContext } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}