// src/components/complaints/Complaints.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { dbFirebase } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import "./Complaints.css";

function Complaints() {
  const { user, userData, isAdmin } = useAuth();

  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [respuestas, setRespuestas] = useState({});

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { tipo: "queja" },
  });

  const {
    register: registerSugerencia,
    handleSubmit: handleSubmitSugerencia,
    reset: resetSugerencia,
  } = useForm();

  const cargarItems = async () => {
    setCargando(true);
    try {
      let q;
      if (isAdmin) {
        q = query(collection(dbFirebase, "quejas"), orderBy("createdAt", "desc"));
      } else {
        q = query(
          collection(dbFirebase, "quejas"),
          where("autorUid", "==", user?.uid || ""),
          orderBy("createdAt", "desc")
        );
      }
      const snapshot = await getDocs(q);
      setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (user) cargarItems();
  }, [user, isAdmin]);

  const handleEnviar = async (data) => {
    try {
      await addDoc(collection(dbFirebase, "quejas"), {
        autorUid: user.uid,
        autorNombre: userData?.nombre || userData?.email || "Usuario",
        tipo: data.tipo,
        asunto: data.asunto,
        mensaje: data.mensaje,
        estado: "pendiente",
        respuesta: "",
        publica: false,
        createdAt: serverTimestamp(),
      });
      reset({ tipo: "queja", asunto: "", mensaje: "" });
      cargarItems();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleAgregarSugerencia = async (data) => {
    try {
      await addDoc(collection(dbFirebase, "quejas"), {
        autorUid: user.uid,
        autorNombre: "Administración",
        tipo: "sugerencia",
        asunto: data.asunto,
        mensaje: data.mensaje,
        estado: "publicada",
        respuesta: "",
        publica: true,
        createdAt: serverTimestamp(),
      });
      resetSugerencia({ asunto: "", mensaje: "" });
      cargarItems();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleResponder = async (id) => {
    const texto = respuestas[id];
    if (!texto || !texto.trim()) {
      alert("Escribe una respuesta antes de enviar.");
      return;
    }
    try {
      await updateDoc(doc(dbFirebase, "quejas", id), {
        respuesta: texto,
        estado: "respondida",
        respondidoPor: userData?.nombre || "Administración",
      });
      setRespuestas((prev) => ({ ...prev, [id]: "" }));
      cargarItems();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const itemsFiltrados = items.filter((item) => {
    const pasaTipo = filtroTipo === "todos" || item.tipo === filtroTipo;
    const pasaEstado = filtroEstado === "todos" || item.estado === filtroEstado;
    return pasaTipo && pasaEstado;
  });

  return (
    <section className="complaints">
      <h1>Quejas y Sugerencias</h1>

      {!isAdmin && (
        <>
          <p className="complaints__subtitle">
            Cuéntanos tu experiencia: reporta una queja o envía una sugerencia para mejorar la plataforma.
          </p>

          <form className="complaints__form" onSubmit={handleSubmit(handleEnviar)}>
            <div className="campo">
              <label htmlFor="tipo">Tipo</label>
              <select id="tipo" {...register("tipo", { required: true })}>
                <option value="queja">Queja</option>
                <option value="sugerencia">Sugerencia</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="asunto">Asunto</label>
              <input
                id="asunto"
                type="text"
                placeholder="Resumen breve"
                {...register("asunto", {
                  required: "El asunto es requerido",
                  minLength: { value: 5, message: "El asunto debe tener al menos 5 caracteres" },
                  maxLength: { value: 100, message: "El asunto no puede exceder 100 caracteres" },
                })}
              />
              {errors.asunto && <span className="errors">{errors.asunto.message}</span>}
            </div>

            <div className="campo">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                placeholder="Describe tu queja o sugerencia"
                {...register("mensaje", {
                  required: "El mensaje es requerido",
                  minLength: { value: 10, message: "El mensaje debe tener al menos 10 caracteres" },
                  maxLength: { value: 1000, message: "El mensaje no puede exceder 1000 caracteres" },
                })}
              />
              {errors.mensaje && <span className="errors">{errors.mensaje.message}</span>}
            </div>

            <button className="btn" type="submit">Enviar</button>
          </form>
        </>
      )}

      {isAdmin && (
        <>
          <p className="complaints__subtitle">
            Revisa y responde las quejas y sugerencias enviadas por los turistas, o publica una nueva
            recomendación general.
          </p>

          <form className="complaints__form complaints__form--suggestion" onSubmit={handleSubmitSugerencia(handleAgregarSugerencia)}>
            <h3>Añadir sugerencia general</h3>
            <div className="campo">
              <label htmlFor="asuntoSugerencia">Asunto</label>
              <input 
                id="asuntoSugerencia"
                type="text" 
                placeholder="Título de la recomendación" 
                {...registerSugerencia("asunto", { required: true })} 
              />
            </div>
            <div className="campo">
              <label htmlFor="mensajeSugerencia">Mensaje</label>
              <textarea 
                id="mensajeSugerencia"
                placeholder="Recomendación para los turistas" 
                {...registerSugerencia("mensaje", { required: true })} 
              />
            </div>
            <button className="btn" type="submit">Publicar sugerencia</button>
          </form>
        </>
      )}

      <div className="complaints__filters">
        <div>
          <label htmlFor="filtroTipo">Tipo</label>
          <select 
            id="filtroTipo"
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="queja">Quejas</option>
            <option value="sugerencia">Sugerencias</option>
          </select>
        </div>
        <div>
          <label htmlFor="filtroEstado">Estado</label>
          <select 
            id="filtroEstado"
            value={filtroEstado} 
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="respondida">Respondida</option>
            <option value="publicada">Publicada</option>
          </select>
        </div>
      </div>

      {cargando && <p>Cargando...</p>}
      {!cargando && itemsFiltrados.length === 0 && <p>No hay registros con estos filtros.</p>}

      <div className="complaints__list">
        {itemsFiltrados.map((item) => (
          <div className="complaint-card" key={item.id}>
            <div className="complaint-card__top">
              <span className={`complaint-card__tag complaint-card__tag--${item.tipo}`}>
                {item.tipo === "queja" ? "Queja" : "Sugerencia"}
              </span>
              <span className={`complaint-card__estado complaint-card__estado--${item.estado}`}>
                {item.estado}
              </span>
            </div>

            <h4>{item.asunto}</h4>
            {isAdmin && <p className="complaint-card__autor">De: {item.autorNombre}</p>}
            <p className="complaint-card__mensaje">{item.mensaje}</p>

            {item.respuesta && (
              <div className="complaint-card__respuesta">
                <strong>Respuesta{item.respondidoPor ? ` de ${item.respondidoPor}` : ""}:</strong>
                <p>{item.respuesta}</p>
              </div>
            )}

            {isAdmin && item.tipo === "queja" && item.estado !== "respondida" && (
              <div className="complaint-card__reply">
                <textarea
                  placeholder="Escribe una respuesta..."
                  value={respuestas[item.id] || ""}
                  onChange={(e) =>
                    setRespuestas((prev) => ({ ...prev, [item.id]: e.target.value }))
                  }
                />
                <button className="btn" onClick={() => handleResponder(item.id)}>
                  Responder
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Complaints;