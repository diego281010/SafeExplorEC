// src/components/admin/AdminZonas.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { dbFirebase } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import "./AdminZonas.css";

const NIVELES_RIESGO = ["bajo", "medio", "alto"];
const TIPOS_DELITO = ["Robos", "Homicidios", "Asaltos", "Extorsión", "Otros"];

// HU-008 a HU-017: registrar, editar, eliminar, listar y clasificar
// zonas de riesgo y zonas turísticas (solo administrador).
function AdminZonas() {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { tipo: "riesgo" },
  });

  const [zonas, setZonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editId, setEditId] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState("todas");

  const cargarZonas = async () => {
    setCargando(true);
    try {
      const q = query(collection(dbFirebase, "zonas"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setZonas(docs);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarZonas();
  }, []);

  const handleGuardar = async (data) => {
    const payload = {
      nombre: data.nombre,
      tipo: data.tipo,
      direccion: data.direccion,
      descripcion: data.descripcion || "",
      nivelRiesgo: data.tipo === "riesgo" ? data.nivelRiesgo : null,
      tipoDelito: data.tipo === "riesgo" ? data.tipoDelito : null,
      cantidadCasos: data.tipo === "riesgo" && data.cantidadCasos ? Number(data.cantidadCasos) : null,
      updatedAt: serverTimestamp(),
    };

    try {
      if (editId) {
        await updateDoc(doc(dbFirebase, "zonas", editId), payload);
        setEditId(null);
      } else {
        await addDoc(collection(dbFirebase, "zonas"), {
          ...payload,
          createdBy: user?.uid || null,
          createdAt: serverTimestamp(),
        });
      }
      reset({ tipo: "riesgo", nombre: "", direccion: "", descripcion: "", nivelRiesgo: "", tipoDelito: "", cantidadCasos: "" });
      cargarZonas();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleEditar = (zona) => {
    setEditId(zona.id);
    reset({
      nombre: zona.nombre,
      tipo: zona.tipo,
      direccion: zona.direccion,
      descripcion: zona.descripcion || "",
      nivelRiesgo: zona.nivelRiesgo || "",
      tipoDelito: zona.tipoDelito || "",
      cantidadCasos: zona.cantidadCasos ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelarEdicion = () => {
    setEditId(null);
    reset({ tipo: "riesgo", nombre: "", direccion: "", descripcion: "", nivelRiesgo: "", tipoDelito: "", cantidadCasos: "" });
  };

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Estás seguro de eliminar esta zona?");
    if (!confirmar) return;
    try {
      await deleteDoc(doc(dbFirebase, "zonas", id));
      cargarZonas();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const zonasFiltradas = zonas.filter((z) =>
    filtroTipo === "todas" ? true : z.tipo === filtroTipo
  );

  return (
    <section className="admin-zonas">
      <h1>Gestión de Zonas de Riesgo y Turísticas</h1>
      <p className="admin-zonas__subtitle">
        Registra el nombre de la zona, la dirección (para localizarla en Google Maps) y,
        si corresponde, los detalles criminales asociados.
      </p>

      <div className="admin-zonas__layout">
        <form className="admin-zonas__form" onSubmit={handleSubmit(handleGuardar)}>
          <h3>{editId ? "Editar zona" : "Registrar nueva zona"}</h3>

          {/* ✅ Campo: Tipo de zona */}
          <div className="campo">
            <label htmlFor="tipo">Tipo de zona</label>
            <select 
              id="tipo"
              {...register("tipo", { required: true })}
            >
              <option value="riesgo">Zona de riesgo</option>
              <option value="turistica">Zona turística</option>
            </select>
          </div>

          {/* ✅ Campo: Nombre de la zona */}
          <div className="campo">
            <label htmlFor="nombre">Nombre de la zona</label>
            <input
              id="nombre"
              type="text"
              placeholder="Ej: La Carolina"
              {...register("nombre", {
                required: "El nombre es requerido",
                minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
                maxLength: { value: 80, message: "El nombre no puede exceder 80 caracteres" },
              })}
            />
            {errors.nombre && <span className="errors">{errors.nombre.message}</span>}
          </div>

          {/* ✅ Campo: Dirección (Google Maps) */}
          <div className="campo">
            <label htmlFor="direccion">Dirección (Google Maps)</label>
            <input
              id="direccion"
              type="text"
              placeholder="Ej: Av. Amazonas y Naciones Unidas, Quito"
              {...register("direccion", {
                required: "La dirección es requerida",
                minLength: { value: 5, message: "La dirección debe tener al menos 5 caracteres" },
              })}
            />
            {errors.direccion && <span className="errors">{errors.direccion.message}</span>}
          </div>

          {/* ✅ Campo: Descripción */}
          <div className="campo">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              placeholder="Descripción general de la zona"
              {...register("descripcion", {
                maxLength: { value: 500, message: "La descripción no puede exceder 500 caracteres" },
              })}
            />
            {errors.descripcion && <span className="errors">{errors.descripcion.message}</span>}
          </div>

          {/* ✅ Fieldset: Detalles criminales */}
          <fieldset className="admin-zonas__criminal">
            <legend>Detalles criminales (solo zonas de riesgo)</legend>

            {/* ✅ Campo: Tipo de delito predominante */}
            <div className="campo">
              <label htmlFor="tipoDelito">Tipo de delito predominante</label>
              <select id="tipoDelito" {...register("tipoDelito")}>
                <option value="">Selecciona un tipo</option>
                {TIPOS_DELITO.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            {/* ✅ Campo: Cantidad de casos registrados */}
            <div className="campo">
              <label htmlFor="cantidadCasos">Cantidad de casos registrados</label>
              <input
                id="cantidadCasos"
                type="number"
                min="0"
                placeholder="Ej: 120"
                {...register("cantidadCasos")}
              />
            </div>

            {/* ✅ Campo: Nivel de riesgo */}
            <div className="campo">
              <label htmlFor="nivelRiesgo">Nivel de riesgo</label>
              <select id="nivelRiesgo" {...register("nivelRiesgo")}>
                <option value="">Selecciona un nivel</option>
                {NIVELES_RIESGO.map((n) => (
                  <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <div className="admin-zonas__form-actions">
            <button className="btn" type="submit">
              {editId ? "Guardar cambios" : "Registrar zona"}
            </button>
            {editId && (
              <button type="button" className="btn btn--outline" onClick={handleCancelarEdicion}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="admin-zonas__list">
          <div className="admin-zonas__list-header">
            <h3>Zonas registradas</h3>
            <select 
              id="filtroTipo"
              value={filtroTipo} 
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="todas">Todas</option>
              <option value="riesgo">Solo zonas de riesgo</option>
              <option value="turistica">Solo zonas turísticas</option>
            </select>
          </div>

          {cargando && <p>Cargando zonas...</p>}
          {!cargando && zonasFiltradas.length === 0 && <p>No hay zonas registradas.</p>}

          <div className="admin-zonas__cards">
            {zonasFiltradas.map((zona) => (
              <div className="zona-card" key={zona.id}>
                <div className="zona-card__top">
                  <h4>{zona.nombre}</h4>
                  <span className={`zona-card__tag zona-card__tag--${zona.tipo}`}>
                    {zona.tipo === "riesgo" ? "Riesgo" : "Turística"}
                  </span>
                </div>

                <a
                  className="zona-card__map-link"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(zona.direccion)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  📍 {zona.direccion}
                </a>

                {zona.descripcion && <p className="zona-card__desc">{zona.descripcion}</p>}

                {zona.tipo === "riesgo" && (
                  <div className="zona-card__crime">
                    {zona.nivelRiesgo && (
                      <span className={`nivel nivel--${zona.nivelRiesgo}`}>
                        Nivel: {zona.nivelRiesgo}
                      </span>
                    )}
                    {zona.tipoDelito && <span>Delito: {zona.tipoDelito}</span>}
                    {zona.cantidadCasos !== null && zona.cantidadCasos !== undefined && (
                      <span>Casos: {zona.cantidadCasos}</span>
                    )}
                  </div>
                )}

                <div className="zona-card__actions">
                  <button className="update-btn" onClick={() => handleEditar(zona)}>Actualizar</button>
                  <button className="delete-btn" onClick={() => handleEliminar(zona.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminZonas;