import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, onLoginClick }) {
  useEffect(() => {
    if (!isLoggedIn && onLoginClick) {
      onLoginClick();
    }
  }, [isLoggedIn, onLoginClick]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
