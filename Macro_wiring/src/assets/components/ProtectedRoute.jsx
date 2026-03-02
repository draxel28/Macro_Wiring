import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if the admin has successfully logged in
  const isAuthorized = sessionStorage.getItem("admin_access");

  if (!isAuthorized) {
    // If not authorized, redirect to home immediately 
    // 'replace' prevents the user from clicking 'back' into the admin page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;