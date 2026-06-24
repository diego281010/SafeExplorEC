import "./Register.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt
} from "react-icons/fa";

function Register() {
  return (
    <div className="login-container">
      <div className="register-card" data-aos="zoom-in">

        <h1
          className="login-title"
          data-aos="fade-down"
        >
          REGISTRARSE
        </h1>

        <div
          className="input-group"
          data-aos="fade-right"
        >
          <FaUser className="icon" />
          <input type="text" placeholder="usuario" />
        </div>

        <div
          className="input-group"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <FaEnvelope className="icon" />
          <input type="email" placeholder="correo" />
        </div>

        <div
          className="input-group"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="contraseña"
          />
        </div>

        <div
          className="input-group"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <FaShieldAlt className="icon" />
          <input
            type="password"
            placeholder="confirmar contraseña"
          />
        </div>

        <button
          className="btn-login"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          REGISTRAR
        </button>

        <p
          className="register-link"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          ¿Ya tienes cuenta? <span>Inicia sesión</span>
        </p>

      </div>
    </div>
  );
}

export default Register;