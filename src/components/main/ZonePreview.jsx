import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { dbFirebase } from "../../firebase";
import { Link } from "react-router-dom";

function ZonePreview() {
  var zonasState = useState([]);
  var zonas = zonasState[0];
  var setZonas = zonasState[1];

  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  useEffect(function () {
    async function cargar() {
      try {
        var q = query(collection(dbFirebase, "zonas"), orderBy("createdAt", "desc"), limit(6));
        var snap = await getDocs(q);
        setZonas(snap.docs.map(function (d) { return { id: d.id, ...d.data() }; }));
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    cargar();
  }, []);

  if (loading) {
    return (
      <section style={{ padding: "2rem", textAlign: "center", background: "#f4f1ec" }}>
        <p>Cargando zonas...</p>
      </section>
    );
  }

  if (zonas.length === 0) {
    return null;
  }

  return (
    <section className="zone-preview-section">
      <h2>Zonas de Riesgo y Turísticas</h2>
      <p className="zone-preview-sub">Conoce las zonas registradas en nuestro sistema</p>
      <div className="zone-preview-grid">
        {zonas.map(function (zona) {
          return (
            <div key={zona.id} className={"zone-preview-card " + (zona.tipo === "riesgo" ? "riesgo" : "turistica")}>
              <div className="zone-preview-badge">
                {zona.tipo === "riesgo" ? "Riesgo" : "Turistica"}
              </div>
              <h3>{zona.nombre}</h3>
              <p className="zone-preview-dir">{zona.direccion ? "📍 " + zona.direccion : ""}</p>
              {zona.descripcion ? <p className="zone-preview-desc">{zona.descripcion}</p> : null}
              {zona.tipo === "riesgo" && zona.nivelRiesgo ? (
                <span className={"zone-preview-level level--" + zona.nivelRiesgo}>
                  {zona.nivelRiesgo}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <Link to="/zonas" className="btn">Ver todas las zonas</Link>
      </div>
    </section>
  );
}

export default ZonePreview;
