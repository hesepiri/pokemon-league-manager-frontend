import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  component: Component,
  isLoggedIn,
  onLoginClick,
  ...props
}) {
  useEffect(() => {
    // Si el usuario no está logueado, disparamos el modal de inicio de sesión
    if (!isLoggedIn && onLoginClick) {
      onLoginClick();
    }
  }, [isLoggedIn, onLoginClick]);

  // Si está logueado, renderiza el componente pasando las props remanentes.
  // Si no, redirige al inicio.
  return isLoggedIn ? <Component {...props} /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
