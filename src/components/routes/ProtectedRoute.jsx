import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, rol, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        Verificando acceso...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(rol)) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return children;
}

export default ProtectedRoute;
