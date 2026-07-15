import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbFirebase } from "../../firebase";
import "./ZonasList.css";

// Listado de zonas de riesgo y turísticas disponible para administrador y turista.
// Permite filtrar por tipo de zona y por nivel de riesgo.
function ZonasList() {
  const [zonas, setZonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState("todas");
  const [filtroNivel, setFiltroNivel] = useState("todos");

  useEffect(() => {
    const cargar = async () => {
      try {
        const q = query(collection(dbFirebase, "zonas"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setZonas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const zonasFiltradas = zonas.filter((z) => {
    const pasaTipo = filtroTipo === "todas" || z.tipo === filtroTipo;
    const pasaNivel =
      filtroNivel === "todos" || (z.tipo === "riesgo" && z.nivelRiesgo === filtroNivel);
    return pasaTipo && (filtroNivel === "todos" ? true : pasaNivel);
  });

  return (
    <section className="zonas-list">
      <h1>Zonas de Riesgo y Turísticas de Quito</h1>
      <p className="zonas-list__subtitle">
        Consulta las zonas registradas, su ubicación y su nivel de riesgo antes de tu recorrido.
      </p>

      <div className="zonas-list__filters">
        <div>
          <label>Tipo</label>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="todas">Todas</option>
            <option value="riesgo">Zonas de riesgo</option>
            <option value="turistica">Zonas turísticas</option>
          </select>
        </div>

        <div>
          <label>Nivel de riesgo</label>
          <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="bajo">Bajo</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>
        </div>
      </div>

      {cargando && <p>Cargando zonas...</p>}
      {!cargando && zonasFiltradas.length === 0 && <p>No se encontraron zonas con estos filtros.</p>}

      <div className="zonas-list__grid">
        {zonasFiltradas.map((zona) => (
          <div className="zona-item" key={zona.id}>
            <div className="zona-item__top">
              <h3>{zona.nombre}</h3>
              <span className={`zona-item__tag zona-item__tag--${zona.tipo}`}>
                {zona.tipo === "riesgo" ? "Riesgo" : "Turística"}
              </span>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(zona.direccion)}`}
              target="_blank"
              rel="noreferrer"
              className="zona-item__map"
            >
              📍 {zona.direccion}
            </a>

            {zona.descripcion && <p className="zona-item__desc">{zona.descripcion}</p>}

            {zona.tipo === "riesgo" && (
              <div className="zona-item__crime">
                {zona.nivelRiesgo && (
                  <span className={`nivel nivel--${zona.nivelRiesgo}`}>Nivel: {zona.nivelRiesgo}</span>
                )}
                {zona.tipoDelito && <span>Delito frecuente: {zona.tipoDelito}</span>}
                {zona.cantidadCasos !== null && zona.cantidadCasos !== undefined && (
                  <span>Casos registrados: {zona.cantidadCasos}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ZonasList;
