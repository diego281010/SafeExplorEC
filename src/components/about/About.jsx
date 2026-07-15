// src/components/about/About.jsx
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullseye,
  faMapMarkedAlt,
  faUsers,
  faExclamationTriangle,
  faShieldHalved,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <section className="about">
      <div className="about__container">

        {/* Fila: caja exterior + panel visual */}
        <div className="about__row">

          <div className="about__outer" data-aos="fade-right" data-aos-duration="1000">
            <div className="about__inner" data-aos="zoom-in" data-aos-delay="150">
              <h2>Acerca de nosotros</h2>
            </div>

            <p className="about__tagline">Tu seguridad, nuestra prioridad.</p>
            <p className="about__description">
              Nuestra plataforma reúne información sobre zonas de riesgo, estadísticas y
              recomendaciones para que puedas planificar tus recorridos con mayor confianza.
            </p>
          </div>

          {/* Panel visual animado (reemplaza la imagen estática) */}
          <div className="about__image" data-aos="fade-left" data-aos-duration="1000">
            <div className="about__image-icon about__image-icon--one">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div className="about__image-icon about__image-icon--two">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className="about__image-icon about__image-icon--three">
              <FontAwesomeIcon icon={faMapMarkedAlt} />
            </div>
          </div>

        </div>

        {/* Caja contenedora grande con las 4 tarjetas */}
        <div className="about__cards-wrapper">
          <div className="about__grid">

            <div className="about__card" data-aos="zoom-in-up" data-aos-delay="0">
              <div className="about__card-icon">
                <FontAwesomeIcon icon={faBullseye} />
              </div>
              <h3>Nuestra Misión</h3>
              <p>Brindar información clara y accesible sobre la seguridad en Quito.</p>
            </div>

            <div className="about__card" data-aos="zoom-in-up" data-aos-delay="100">
              <div className="about__card-icon">
                <FontAwesomeIcon icon={faMapMarkedAlt} />
              </div>
              <h3>¿Qué encontrarás?</h3>
              <ul>
                <li>Mapa de zonas de riesgo.</li>
                <li>Estadísticas actualizadas.</li>
                <li>Consejos de prevención.</li>
                <li>Información útil para turistas.</li>
              </ul>
            </div>

            <div className="about__card" data-aos="zoom-in-up" data-aos-delay="200">
              <div className="about__card-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>¿Para quién es?</h3>
              <p>Turistas nacionales e internacionales que desean conocer Quito de forma segura.</p>
            </div>

            <div className="about__card" data-aos="zoom-in-up" data-aos-delay="300">
              <div className="about__card-icon">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
              <h3>Aviso</h3>
              <p>La información es orientativa y no reemplaza las recomendaciones de las autoridades locales.</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
