// src/components/register/Register.jsx
import "./Register.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaUserCog
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useForm } from "react-hook-form";
import { authFirebase, dbFirebase } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function Register() {
  const navigate = useNavigate()
const { register, handleSubmit, watch, formState: { errors } } = useForm({
  mode: 'onChange', 
  reValidateMode: 'onChange', 
});
  
  // ✅ AGREGADO: Para validar que las contraseñas coincidan
  const password = watch('password');

  const handleRegister = async (data) => {
    const { email, password, usuario, rol } = data
    try {
      const newUserFirebase = await createUserWithEmailAndPassword(authFirebase, email, password)
      const userRegister = newUserFirebase.user

      if (userRegister) {
        await setDoc(doc(dbFirebase, "Users", userRegister.uid), {
          nombre: usuario,
          apellido: "",
          email: userRegister.email,
          telefono: "",
          cedula: "",
          rol: rol === "admin" ? "admin" : "turista",
          createdAt: serverTimestamp(),
        })
      }

      navigate("/login")
    } catch (error) {
      console.log(error.message)
      alert(error.message)
    }
  }
  
  return (
    <div className="login-container">
      <form className="formulario" onSubmit={handleSubmit(handleRegister)}>
        <div className="register-card" data-aos="zoom-in">

          <h1 className="login-title" data-aos="fade-down">
            REGISTRARSE
          </h1>

          <div className="input-group" data-aos="fade-right">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="usuario"
              {...register("usuario", { 
                required: true,
                maxLength: 25 // ✅ AGREGADO: Máximo 25 caracteres
              })}
            />
          </div>
          {errors.usuario && errors.usuario.type === "required" && <span className="errors">El usuario es requerido</span>}
          {errors.usuario && errors.usuario.type === "maxLength" && <span className="errors">Máximo 25 caracteres</span>}

          <div
            className="input-group"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="correo"
              {...register("email", { 
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // ✅ AGREGADO: Formato de email válido
              })}
            />
          </div>
          {errors.email && errors.email.type === "required" && <span className="errors">El correo es requerido</span>}
          {errors.email && errors.email.type === "pattern" && <span className="errors">Ingresa un email válido</span>}

          <div
            className="input-group"
            data-aos="fade-right"
            data-aos-delay="150"
          >
            <FaUserCog className="icon" />
            <select
              defaultValue="turista"
              {...register("rol", { required: true })}
            >
              <option value="turista">Turista</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          {errors.rol && <span className="errors">Selecciona un rol</span>}

          <div
            className="input-group"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="contraseña"
              {...register("password", { 
                required: true,
                minLength: 5 // ✅ AGREGADO: Mínimo 5 caracteres
              })}
            />
          </div>
          {errors.password && errors.password.type === "required" && <span className="errors">La contraseña es requerida</span>}
          {errors.password && errors.password.type === "minLength" && <span className="errors">Mínimo 5 caracteres</span>}

          <div
            className="input-group"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <FaShieldAlt className="icon" />
            <input
              type="password"
              placeholder="confirmar contraseña"
              {...register("confirmPassword", { 
                required: true,
                validate: value => value === password || "Las contraseñas no coinciden" // ✅ AGREGADO: Validación de coincidencia
              })}
            />
          </div>
          {errors.confirmPassword && errors.confirmPassword.type === "required" && (
            <span className="errors">Confirma tu contraseña</span>
          )}
          {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
            <span className="errors">{errors.confirmPassword.message}</span>
          )}

          <button
            className="btn-login"
            data-aos="zoom-in"
            data-aos-delay="400"
            type="submit"
          >
            REGISTRAR
          </button>

          <p
            className="register-link"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            ¿Ya tienes cuenta? <NavLink to="/login" className="enlace"><span>Inicia sesión</span></NavLink>
          </p>

        </div>
      </form>
    </div>
  );
}

export default Register;