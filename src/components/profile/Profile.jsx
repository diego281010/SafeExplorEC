// src/components/profile/Profile.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { dbFirebase, authFirebase } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

// HU-005/006/007 (Administrador) y HU-030/031/032 (Turista):
// registrar, visualizar y editar información personal.
function Profile() {
  const { user, userData } = useAuth();
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (userData) {
      reset({
        nombre: userData.nombre || "",
        apellido: userData.apellido || "",
        telefono: userData.telefono || "",
        cedula: userData.cedula || "",
      });
    }
  }, [userData, reset]);

  const handleUpdate = async (data) => {
    if (!user) return;
    setGuardando(true);
    try {
      await updateDoc(doc(dbFirebase, "Users", user.uid), {
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        cedula: data.cedula,
      });
      setEditando(false);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authFirebase.signOut();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  if (!userData) {
    return (
      <section className="profile">
        <div className="profile__card">
          <p>Cargando información de tu perfil...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="profile">
      <div className="profile__card" data-aos="fade-up">
        <div className="profile__header">
          <h1>Mi Perfil</h1>
          <span className={`profile__badge profile__badge--${userData.rol}`}>
            {userData.rol === "admin" ? "Administrador" : "Turista"}
          </span>
        </div>

        {!editando ? (
          <>
            <div className="profile__info">
              <div className="profile__field">
                <span className="profile__label">Nombre</span>
                <span className="profile__value">{userData.nombre || "Sin registrar"}</span>
              </div>
              <div className="profile__field">
                <span className="profile__label">Apellido</span>
                <span className="profile__value">{userData.apellido || "Sin registrar"}</span>
              </div>
              <div className="profile__field">
                <span className="profile__label">Correo</span>
                <span className="profile__value">{userData.email}</span>
              </div>
              <div className="profile__field">
                <span className="profile__label">Teléfono</span>
                <span className="profile__value">{userData.telefono || "Sin registrar"}</span>
              </div>
              <div className="profile__field">
                <span className="profile__label">Cédula</span>
                <span className="profile__value">{userData.cedula || "Sin registrar"}</span>
              </div>
            </div>

            <div className="profile__actions">
              <button className="btn" onClick={() => setEditando(true)}>
                Editar información
              </button>
              <button className="btn btn--outline" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </>
        ) : (
          <form className="profile__form" onSubmit={handleSubmit(handleUpdate)}>
            <div className="campo">
              <label>Nombre</label>
              <input type="text" {...register("nombre", { required: "El nombre es requerido" })} />
              {errors.nombre && <span className="errors">{errors.nombre.message}</span>}
            </div>


            <div className="campo">
              <label>Apellido</label>
              <input type="text" {...register("apellido")} />
            </div>

            <div className="campo">
              <label>Teléfono</label>
              <input
                type="tel"
                placeholder="0999999999"
                {...register("telefono", {
                  pattern: {
                    value: /^09\d{8}$/,
                    message: "Ingresa un número válido (09XXXXXXXX)"
                  }
                })}
              />
              {errors.telefono && <span className="errors">{errors.telefono.message}</span>}
            </div>

            <div className="campo">
              <label>Cédula</label>
              <input
                type="text"
                placeholder="1234567890"
                {...register("cedula", {
                  pattern: {
                    value: /^\d{10}$/,
                    message: "La cédula debe tener 10 dígitos"
                  }
                })}
              />
              {errors.cedula && <span className="errors">{errors.cedula.message}</span>}
            </div>

            <div className="profile__actions">
              <button className="btn" type="submit" disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default Profile;