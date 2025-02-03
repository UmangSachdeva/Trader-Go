import { Navigate, useLocation } from "react-router-dom";
import { useGetUserDetails } from "@/api/auth/quries";

function ProtectedRoute({ children }) {
  const { data: isLoggedIn, isLoading } = useGetUserDetails();
  const location = useLocation();

  if (!isLoggedIn && !isLoading) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, render the protected route
  return children;
}

export default ProtectedRoute;
