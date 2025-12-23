import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, admin }) {
  const { user } = useSelector((s) => s.auth);

  if (!user) return <Navigate to="/auth" replace />;

  if (admin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
