import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

export default function ProtectedRoute({ children }: any) {
  const { state } = useAuth();
  const location = useLocation();

  if (!state.user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
/**  Q 1 : 
<Navigate /> is used because it is a component used inside JSX.
navigate() is a hook function used inside event handlers.*/