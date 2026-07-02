import "./Register.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt
} from "react-icons/fa";

import { createUserWithEmailAndPassword } from "firebase/auth"
import { NavLink, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { authFirebase } from "../../firebase";

function Register() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()


  const handleRegister = async (data) => {
    const { email, password } = data
    try {
      const newUserFirebase = await createUserWithEmailAndPassword(authFirebase, email, password)
      const userRegister = newUserFirebase.user
      console.log(userRegister)
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
              {...register("usuario", { required: true })}
            />
          </div>
          {errors.usuario && <span className="errors">El usuario es requerido</span>}

          <div
            className="input-group"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="correo"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && <span className="errors">El correo es requerido</span>}

          <div
            className="input-group"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="contraseña"
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && <span className="errors">La contraseña es requerida</span>}

          <div
            className="input-group"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <FaShieldAlt className="icon" />
            <input
              type="password"
              placeholder="confirmar contraseña"
              {...register("confirmPassword", { required: true })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="errors">Confirma tu contraseña</span>
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