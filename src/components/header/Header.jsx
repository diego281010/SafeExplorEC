import { useEffect, useState } from "react";
import { FaUser, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Bloquea el scroll del body mientras el menú está abierto (mobile/tablet)
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await authFirebase.signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const closeMenu = () => setMenuOpen(false);

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

      {/* Botón hamburguesa - visible solo en mobile y tablet */}
      <button
        type="button"
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        aria-controls="header-right-menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Lado derecho - SIN ANIMACIÓN */}
      <div
        id="header-right-menu"
        className={`header__right ${menuOpen ? "header__right--open" : ""}`}
      >
        <nav className="nav">
          <Link to="/" className={pathname === "/" ? "activo" : ""} onClick={closeMenu}>Inicio</Link>
          <Link to="/nosotros" className={pathname === "/nosotros" ? "activo" : ""} onClick={closeMenu}>Acerca de Nosotros</Link>
          <Link to="/mapas" className={pathname === "/mapas" ? "activo" : ""} onClick={closeMenu}>Mapa Interactivo</Link>
          {/* Zonas es pública: visible con o sin sesión iniciada */}
          <Link to="/zonas" className={pathname === "/zonas" ? "activo" : ""} onClick={closeMenu}>Zonas</Link>
          {/* Estadísticas es pública: visible con o sin sesión iniciada */}
          <Link to="/estadisticas" className={pathname === "/estadisticas" ? "activo" : ""} onClick={closeMenu}>Estadísticas</Link>

          {user && (
            <>
              <Link to="/quejas" className={pathname === "/quejas" ? "activo" : ""} onClick={closeMenu}>Quejas y Sugerencias</Link>
              {isAdmin && (
                <Link to="/admin/zonas" className={pathname === "/admin/zonas" ? "activo" : ""} onClick={closeMenu}>
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
              <Link to="/perfil" onClick={closeMenu}>{userData?.nombre || "Mi Perfil"}</Link>
              <button className="header__logout" onClick={handleLogout}>Salir</button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu}>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
