import { FaUser, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { authFirebase } from "../../firebase";
import "./Header.css";

// Componente TextRoll corregido
const TextRoll = ({ children, className }) => {
  const STAGGER = 0.035;
  
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`text-roll-container ${className}`}
    >
      {/* Capa superior (visible) */}
      <div className="text-roll-top">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="text-roll-letter"
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
      {/* Capa inferior (oculta, se revela al hacer hover) */}
      <div className="text-roll-bottom">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="text-roll-letter"
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.span>
  );
};

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, userData, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await authFirebase.signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      {/* Logo con animación SOLO en el texto */}
      <div className="logo">
        <img src={logo} alt="SafeExplorEC Logo" />
        <h1>
          <TextRoll className="text-roll-logo">SafeExplor</TextRoll>
          <span className="text-roll-ec-wrapper">
            <TextRoll className="text-roll-ec">EC</TextRoll>
          </span>
        </h1>
      </div>

      {/* Lado derecho - SIN ANIMACIÓN */}
      <div className="header__right">
        <nav className="nav">
          <Link to="/" className={pathname === "/" ? "activo" : ""}>Inicio</Link>
          <Link to="/nosotros" className={pathname === "/nosotros" ? "activo" : ""}>Acerca de Nosotros</Link>
          <Link to="/mapas" className={pathname === "/mapas" ? "activo" : ""}>Mapa Interactivo</Link>
          {/* Zonas es pública: visible con o sin sesión iniciada */}
          <Link to="/zonas" className={pathname === "/zonas" ? "activo" : ""}>Zonas</Link>
          {/* Estadísticas es pública: visible con o sin sesión iniciada */}
          <Link to="/estadisticas" className={pathname === "/estadisticas" ? "activo" : ""}>Estadísticas</Link>

          {user && (
            <>
              <Link to="/quejas" className={pathname === "/quejas" ? "activo" : ""}>Quejas y Sugerencias</Link>
              {isAdmin && (
                <Link to="/admin/zonas" className={pathname === "/admin/zonas" ? "activo" : ""}>
                  Panel Admin
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="account">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
            title={isDark ? "Modo claro" : "Modo oscuro"}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          <FaUser />
          {user ? (
            <>
              <Link to="/perfil">{userData?.nombre || "Mi Perfil"}</Link>
              <button className="header__logout" onClick={handleLogout}>Salir</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;