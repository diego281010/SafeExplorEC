import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { authFirebase } from "../../firebase";

function Login() {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const handleLogin = async (data) => {
    const { email, password } = data
    try {
      await signInWithEmailAndPassword(authFirebase, email, password)
      navigate('/dashboard')
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
              placeholder="usuario"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && <span className="errors">El email es requerido</span>}

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="contraseña"
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && <span className="errors">La contraseña es requerida</span>}

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