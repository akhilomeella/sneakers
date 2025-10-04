import { Navigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoggedIn, loading } = useAuth();

  // Show loading while checking auth status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the protected component
  return children;
};

export default ProtectedRoute;
