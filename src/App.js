import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./views/auth/ProtectedRoute";
import PublicRoute from "./views/auth/PublicRoute";
import "./App.css";

import { useAuth } from "./views/auth/AuthProvider";

// Import your components
import LoginPage from "./views/login/loginPage";
import SignupPage from "./views/login/signupPage";
import DashboardLayout from "./views/dashboard/DashboardLayout";
import ConnectBinance from "./views/homePage/connectBinance";
import LandingPage from "./views/landingPage/landingPage";
import Pricing from "./views/pricing/pricing";
import ForgotPassword from "./views/login/forgotPassword";
import TermsAndConditions from "./views/terms/termsAndConditions"

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only handle auto-login if not on login page
    // if (window.location.pathname !== '/login') {
      const userData = localStorage.getItem("userData");
      const token = localStorage.getItem("token");
  
      if (userData && token) {
        const user = JSON.parse(userData);
        let redirectPath;
  
        // Determine the correct path based on user state
        if (user?.plan === null) {
          redirectPath = "/pricing";
        } else if (user?.binance_connected === false) {
          redirectPath = "/connect-binance";
        } else {
          redirectPath = "/dashboard";
        }
        
        // First set the auth context
        auth.login(user);
        
        // Then navigate to the appropriate path
        // Only navigate if we're not already on that path
        if (window.location.pathname !== redirectPath) {
          navigate(redirectPath);
        }
      }
    // }
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/forgot-password/:token?" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        <Route path="/connect-binance" element={<ConnectBinance />} />
      </Route>

      {/* Catch all route - Redirect to dashboard if authenticated, otherwise to landing page */}
      <Route
        path="*"
        element={
          <Navigate
            to={localStorage.getItem("token") ? "/dashboard" : "/"}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
