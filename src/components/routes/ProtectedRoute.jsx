import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Envuelve rutas privadas.
// - Si no hay sesión, redirige a /login.
// - Si se define allowedRoles y el rol del usuario no está incluido, redirige a /acceso-denegado.
// Mientras se resuelve el estado de autenticación se muestra un loader simple.
function ProtectedRoute({ children, allowedRoles }) {
  const { user, rol, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        Cargando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(rol)) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return children;
}

export default ProtectedRoute;
