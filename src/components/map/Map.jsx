import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { dbFirebase } from "../../firebase";
import "./Map.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function createIcon(color) {
  return L.divIcon({
    className: "custom-div-icon",
    html: '<div style="background-color:' + color + ';width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">' + (color === "#d9534f" ? "!" : "&#9733;") + "</div>",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

function CenterMap(coordsProp) {
  var map = useMap();
  useEffect(function () {
    if (coordsProp.coords) map.setView(coordsProp.coords, 14);
  }, [coordsProp.coords, map]);
  return null;
}

function Map() {
  var zonasState = useState([]);
  var zonas = zonasState[0];
  var setZonas = zonasState[1];

  var loadingState = useState(true);
  var cargandoZonas = loadingState[0];
  var setCargandoZonas = loadingState[1];

  var centerState = useState([-0.229, -78.524]);
  var center = centerState[0];
  var setCenter = centerState[1];

  var busquedaState = useState("");
  var busqueda = busquedaState[0];
  var setBusqueda = busquedaState[1];

  var filtroState = useState("todas");
  var filtroTipo = filtroState[0];
  var setFiltroTipo = filtroState[1];

  useEffect(function () {
    async function cargar() {
      try {
        var q = query(collection(dbFirebase, "zonas"), orderBy("createdAt", "desc"));
        var snap = await getDocs(q);
        setZonas(snap.docs.map(function (d) { return { id: d.id, ...d.data() }; }));
      } catch (err) {
        console.log("Error:", err);
      }
      setCargandoZonas(false);
    }
    cargar();
  }, []);

  async function buscarDireccion() {
    if (!busqueda.trim()) return;
    try {
      var resp = await fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent(busqueda + ", Quito, Ecuador") + "&limit=5&accept-language=es");
      var data = await resp.json();
      if (data.length > 0) {
        setCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        alert("No se encontraron resultados");
      }
    } catch (err) {
      console.log(err);
      alert("Error al buscar");
    }
  }

  var zonasFiltradas = zonas.filter(function (z) {
    return filtroTipo === "todas" || z.tipo === filtroTipo;
  });

  function getIcon(zona) {
    return zona.tipo === "riesgo" ? createIcon("#d9534f") : createIcon("#5cb85c");
  }

  var markers = zonasFiltradas.map(function (zona) {
    return (
      <Marker key={zona.id} position={[zona.lat || -0.229, zona.lng || -78.524]} icon={getIcon(zona)}>
        <Popup>
          <div>
            <h4>{zona.nombre}</h4>
            <p><em>{zona.tipo === "riesgo" ? "Riesgo" : "Turistica"}</em></p>
            <p>{zona.descripcion || ""}</p>
            {zona.tipo === "riesgo" ? (
              <div>
                {zona.nivelRiesgo ? <p>Nivel: <strong>{zona.nivelRiesgo}</strong></p> : null}
                {zona.tipoDelito ? <p>Delito: {zona.tipoDelito}</p> : null}
              </div>
            ) : null}
          </div>
        </Popup>
      </Marker>
    );
  });

  return (
    <section className="leaflet-map-section">
      <div className="leaflet-map-header">
        <h2>Mapa Interactivo de Quito</h2>
        <p>Explora zonas de riesgo y turisticas. Usa el buscador para ir a una ubicacion especifica.</p>
      </div>
      <div className="leaflet-map-controls">
        <div className="leaflet-search-group">
          <input type="text" placeholder="Buscar direccion, barrio o lugar..." value={busqueda} onChange={function (e) { setBusqueda(e.target.value); }} onKeyDown={function (e) { if (e.key === "Enter") buscarDireccion(); }} />
          <button className="leaflet-search-btn" onClick={buscarDireccion}>Buscar</button>
        </div>
        <div className="leaflet-filter-group">
          <label>Filtrar:</label>
          <select value={filtroTipo} onChange={function (e) { setFiltroTipo(e.target.value); }}>
            <option value="todas">Todas las zonas</option>
            <option value="riesgo">Zonas de riesgo</option>
            <option value="turistica">Zonas turisticas</option>
          </select>
        </div>
      <div className="leaflet-map-container">
        {cargandoZonas ? <div className="leaflet-loading">Cargando mapa...</div> : null}
        <MapContainer center={center} zoom={13} className="leaflet-map" scrollWheelZoom={true}>
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CenterMap coords={center} />
          {markers}
        </MapContainer>
      </div>
      </div>
      <div className="leaflet-legend">
        <span><span className="legend-dot riesgo"></span> Zona de riesgo</span>
        <span><span className="legend-dot turistica"></span> Zona turistica</span>
      </div>
    </section>
  );
}

export default Map;
