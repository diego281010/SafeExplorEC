import { FaSearch, FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="SafeExplorEC Logo" />
        <h1>
          SafeExplor<span>EC</span>
        </h1>
      </div>

      {/* Lado derecho */}
      <div className="header__right">
        {/* Navegación */}
        <nav className="nav">
          <a href="#" className="activo">
            Inicio
          </a>
          <a href="#">Quito</a>
          <a href="#">Casos Criminales</a>
          <a href="#">Mapas</a>
        </nav>

        {/* Buscador */}
        <div className="search">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar..."
          />
        </div>

        {/* Crear cuenta */}
        <div className="account">
          <FaUser />
          <a href="#">Crear Cuenta</a>
        </div>
      </div>
    </header>
  );
}

export default Header;