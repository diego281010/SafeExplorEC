// src/components/login/Login.jsx
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { authFirebase } from "../../firebase";

function Login() {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
  mode: 'onChange',
  reValidateMode: 'onChange', 
});

  const handleLogin = async (data) => {
    const { email, password } = data
    try {
      await signInWithEmailAndPassword(authFirebase, email, password)
      navigate('/perfil')
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">INICIAR SESION</h1>

        <form className="formulario" onSubmit={handleSubmit(handleLogin)}>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="email"
              placeholder="correo"
              {...register("email", { 
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // ✅ AGREGADO: Formato de email válido
                maxLength: { value: 100, message: "Máximo 100 caracteres" },
              })}
            />
          </div>
          {errors.email && errors.email.type === "required" && <span className="errors">El email es requerido</span>}
          {errors.email && errors.email.type === "pattern" && <span className="errors">Ingresa un email válido</span>}
          {errors.email && errors.email.type === "maxLength" && <span className="errors">{errors.email.message}</span>}

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="contraseña"
              {...register("password", {
                required: true,
                minLength: { value: 5, message: "La contraseña debe tener al menos 5 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
            />
          </div>
          {errors.password && errors.password.type === "required" && <span className="errors">La contraseña es requerida</span>}
          {errors.password && (errors.password.type === "minLength" || errors.password.type === "maxLength") && (
            <span className="errors">{errors.password.message}</span>
          )}

          <button className="btn-login" type="submit">
            INGRESAR
          </button>

        </form>

        <p className="register-link">
          ¿No tienes cuenta?
          <NavLink to="/register"><span>Regístrate</span></NavLink>
        </p>

      </div>
    </div>
  );
}

export default Login;