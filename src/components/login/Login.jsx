import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">INICIAR SESION</h1>

        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" placeholder="usuario" />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input type="password" placeholder="contraseña" />
        </div>

        <button className="btn-login">
          INGRESAR
        </button>

        <p className="register-link">
          ¿No tienes cuenta? <span>Regístrate</span>
        </p>
      </div>
    </div>
  );
}

export default Login;