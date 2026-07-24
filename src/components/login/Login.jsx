// src/components/login/Login.jsx
import "./Login.css";
import { FaUser, FaLock, FaShieldAlt, FaGoogle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authFirebase } from "../../firebase";
import { loginConGoogle } from "../../utils/socialAuth";

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
      toast.success("¡Bienvenido de nuevo! 🎉")
      navigate('/perfil')
    } catch (error) {
      console.log(error)
      toast.error(error.message || "No se pudo iniciar sesión")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginConGoogle();
      toast.success("¡Bienvenido! 🎉")
      navigate('/perfil')
    } catch (error) {
      console.log(error);
      // El usuario cerró el popup, no mostramos error molesto
      if (error.code === "auth/popup-closed-by-user") return;
      toast.error(error.message || "No se pudo iniciar sesión con Google");
    }
  }

  return (
    <div className="login-container">
      <div className="auth-layout" data-aos="fade-up" data-aos-duration="800">

        <div
          className="auth-image"
          data-aos="fade-right"
          data-aos-duration="900"
        >
          <div className="auth-image__overlay">
            <FaShieldAlt className="auth-image__icon" />
            <h2>Explora Quito con seguridad</h2>
            <p>Mapas, estadísticas y alertas para tomar decisiones informadas en tus recorridos.</p>
          </div>
        </div>

        <div className="login-card" data-aos="fade-left" data-aos-duration="900">
          <h1 className="login-title" data-aos="fade-down" data-aos-delay="150">INICIAR SESION</h1>

          <form className="formulario" onSubmit={handleSubmit(handleLogin)}>

            <div className="input-group" data-aos="fade-right" data-aos-delay="200">
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

            <div className="input-group" data-aos="fade-left" data-aos-delay="250">
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

            <button className="btn-login" data-aos="zoom-in" data-aos-delay="350" type="submit">
              INGRESAR
            </button>

          </form>

          <div className="divider" data-aos="fade-up" data-aos-delay="380">o</div>

          <button
            type="button"
            className="btn-google"
            onClick={handleGoogleLogin}
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <FaGoogle /> Continuar con Google
          </button>

          <p className="register-link" data-aos="fade-up" data-aos-delay="450">
            ¿No tienes cuenta?
            <NavLink to="/register"><span>Regístrate</span></NavLink>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;