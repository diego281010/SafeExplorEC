import './Footer.css';
import logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer>
            <div className="footer__content">

                <nav className="footer__nav">
                    <a href="/" className="footer__inicio">Inicio</a>
                </nav>

                <div className="footer__contacto">
                    <span className="footer__label">Contáctanos:</span>
                    <a href="mailto:safeexplorec@gmail.com" className="footer__value">
                        safeexplorec@gmail.com
                    </a>
                </div>

                <div className="footer__telefono">
                    <span className="footer__label">Llámanos:</span>
                    <a href="tel:+593999919237" className="footer__value">
                        (593) 999919237
                    </a>
                </div>

                <div className="footer__logo">
                    <img src={logo} alt="SafeExplorEC" />
                </div>

            </div>

            <hr className="footer__divider" />

            <p className="footer__url">www.safeexplorec.com</p>
        </footer>
    );
};

export default Footer;