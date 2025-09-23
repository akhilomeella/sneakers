import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  // Show loading while checking auth status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!isLoggedIn || !user) {
    return navigate("/login");
  }

  // If logged in, render the protected component
  return children;
};

export default ProtectedRoute;
