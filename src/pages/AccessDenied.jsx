import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <div style={{ padding: "5rem 2rem", textAlign: "center" }}>
      <h1>Acceso denegado</h1>
      <p>No tienes permisos para ver esta página.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  );
}

export default AccessDenied;
