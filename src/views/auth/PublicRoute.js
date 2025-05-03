import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  const currentPath = window.location.pathname;

  // We don't want to redirect from login page immediately after authentication
  // This allows the login page to handle its own redirection logic
  const isLoginProcess = sessionStorage.getItem("loginInProgress") === "true";
  
  // Only redirect authenticated users away from login/signup if they're not in the login process
  if (isAuthenticated && 
      (currentPath === "/" || currentPath.match(/\/(login|signup)$/)) && 
      !isLoginProcess && 
      currentPath !== "/login") {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default PublicRoute; 