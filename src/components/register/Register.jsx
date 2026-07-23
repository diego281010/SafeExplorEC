// src/components/register/Register.jsx
import "./Register.css";
import { FaUser, FaEnvelope, FaLock, FaShieldAlt, FaUserCog } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { authFirebase, dbFirebase } from "../../firebase";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
  findDuplicateUser,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/registrationValidation";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const password = watch("password");

  const handleRegister = async (data) => {
    const { email, password: passwordValue, usuario, rol } = data;
    const normalizedEmail = (email || "").trim().toLowerCase();
    const normalizedUsername = (usuario || "").trim().toLowerCase();

    clearErrors(["email", "usuario", "password", "confirmPassword"]);

    if (!validateEmail(normalizedEmail)) {
      setError("email", { type: "custom", message: "Ingresa un email válido" });
      return;
    }

    if (!validateUsername(usuario)) {
      setError("usuario", { type: "custom", message: "Usa 3 a 20 letras, números o guion bajo" });
      return;
    }

    if (!validatePassword(passwordValue)) {
      setError("password", { type: "custom", message: "La contraseña debe tener al menos 5 caracteres" });
      return;
    }

    try {
      const usersSnapshot = await getDocs(collection(dbFirebase, "Users"));
      const existingUsers = usersSnapshot.docs.map((docItem) => ({
        email: docItem.data().email || "",
        nombre: docItem.data().nombre || "",
      }));

      // Verificar duplicados antes de crear el usuario
      const duplicates = findDuplicateUser({ email: normalizedEmail, username: normalizedUsername }, existingUsers);

      if (duplicates.emailExists) {
        setError("email", { type: "custom", message: "Este correo ya está registrado" });
        return;
      }

      if (duplicates.usernameExists) {
        setError("usuario", { type: "custom", message: "Ese nombre de usuario ya está en uso" });
        return;
      }

      const newUserFirebase = await createUserWithEmailAndPassword(authFirebase, normalizedEmail, passwordValue);
      const userRegister = newUserFirebase.user;

      if (userRegister) {
        await setDoc(doc(dbFirebase, "Users", userRegister.uid), {
          nombre: usuario.trim(),
          apellido: "",
          email: normalizedEmail,
          telefono: "",
          cedula: "",
          rol: rol === "admin" ? "admin" : "turista",
          createdAt: serverTimestamp(),
        });
      }

      navigate("/login");
    } catch (error) {
      console.log(error.message);
      if (error.message?.includes("already in use")) {
        setError("email", { type: "custom", message: "Este correo ya está registrado" });
      } else {
        alert(error.message);
      }
    }
  };

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
              placeholder="Usuario"
              autoComplete="username"
              {...register("usuario", {
                required: "El usuario es requerido",
                maxLength: { value: 20, message: "Máximo 20 caracteres" },
              })}
            />
          </div>
          {errors.usuario && <span className="errors">{errors.usuario.message}</span>}

          <div className="input-group" data-aos="fade-left" data-aos-delay="100">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Correo"
              autoComplete="email"
              {...register("email", {
                required: "El correo es requerido",
                maxLength: { value: 100, message: "Máximo 100 caracteres" },
              })}
            />
          </div>
          {errors.email && <span className="errors">{errors.email.message}</span>}

          <div className="input-group" data-aos="fade-right" data-aos-delay="150">
            <FaUserCog className="icon" />
            <select defaultValue="turista" {...register("rol", { required: "Selecciona un rol" })}>
              <option value="turista">Turista</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          {errors.rol && <span className="errors">{errors.rol.message}</span>}

          <div className="input-group" data-aos="fade-right" data-aos-delay="200">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Contraseña"
              autoComplete="new-password"
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: { value: 5, message: "La contraseña debe tener al menos 5 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
            />
          </div>
          {errors.password && <span className="errors">{errors.password.message}</span>}

          <div className="input-group" data-aos="fade-left" data-aos-delay="300">
            <FaShieldAlt className="icon" />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Confirma tu contraseña",
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
                validate: (value) => value === password || "Las contraseñas no coinciden",
              })}
            />
          </div>
          {errors.confirmPassword && <span className="errors">{errors.confirmPassword.message}</span>}

          <button className="btn-login" data-aos="zoom-in" data-aos-delay="400" type="submit">
            REGISTRAR
          </button>

          <p className="register-link" data-aos="fade-up" data-aos-delay="500">
            ¿Ya tienes cuenta? <NavLink to="/login" className="enlace"><span>Inicia sesión</span></NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
