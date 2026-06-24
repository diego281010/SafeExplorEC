import { FaSearch, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
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
          <Link to="/" className="activo">Inicio</Link>
          <a href="#">Quito</a>
          <a href="#">Casos Criminales</a>
          <a href="#">Mapas</a>
        </nav>

        <div className="search">
          <FaSearch />
          <input type="text" placeholder="Buscar..." />
        </div>

        <div className="account">
          <FaUser />
          <Link to="/login"> Crear Cuenta</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;