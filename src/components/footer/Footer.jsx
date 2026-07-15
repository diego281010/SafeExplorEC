import './Footer.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    const anioActual = new Date().getFullYear();

    return (
        <footer>
            <div className="footer__grid">

                <div className="footer__col footer__col--brand">
                    <img src={logo} alt="SafeExplorEC" className="footer__brand-logo" />
                    <h3>SafeExplorEC</h3>
                    <p>
                        Información de seguridad, zonas de riesgo y lugares turísticos de Quito
                        para que explores la ciudad de forma más informada y segura.
                    </p>
                </div>

                <div className="footer__col">
                    <h4>Navegación</h4>
                    <nav className="footer__links">
                        <Link to="/">Inicio</Link>
                        <Link to="/nosotros">Acerca de Nosotros</Link>
                        <Link to="/mapas">Mapa Interactivo</Link>
                        <Link to="/zonas">Zonas de Riesgo y Turísticas</Link>
                        <Link to="/quejas">Quejas y Sugerencias</Link>
                    </nav>
                </div>

                <div className="footer__col">
                    <h4>Cuenta</h4>
                    <nav className="footer__links">
                        <Link to="/login">Iniciar sesión</Link>
                        <Link to="/register">Registrarse</Link>
                        <Link to="/perfil">Mi Perfil</Link>
                    </nav>
                </div>

                <div className="footer__col">
                    <h4>Contacto</h4>
                    <div className="footer__contacto">
                        <span className="footer__label">Correo:</span>
                        <a href="mailto:safeexplorec@gmail.com" className="footer__value">
                            safeexplorec@gmail.com
                        </a>
                    </div>
                    <div className="footer__contacto">
                        <span className="footer__label">Teléfono:</span>
                        <a href="tel:+593999919237" className="footer__value">
                            (593) 999 919 237
                        </a>
                    </div>
                    <div className="footer__contacto">
                        <span className="footer__label">Dirección:</span>
                        <span className="footer__value">Quito, Ecuador</span>
                    </div>
                    <div className="footer__contacto">
                        <span className="footer__label">Horario de atención:</span>
                        <span className="footer__value">Lunes a Viernes, 08:00 - 18:00</span>
                    </div>
                </div>

                <div className="footer__col">
                    <h4>Síguenos</h4>
                    <div className="footer__social">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter / X</a>
                    </div>
                    <p className="footer__emergency">
                        Emergencias (ECU 911): <a href="tel:911">911</a>
                    </p>
                </div>

            </div>

            <hr className="footer__divider" />

            <div className="footer__bottom">
                <p className="footer__url">www.safeexplorec.com</p>
                <p className="footer__copyright">
                    © {anioActual} SafeExplorEC. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;