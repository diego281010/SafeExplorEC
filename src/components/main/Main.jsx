// src/components/main/Main.jsx
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faBell, faMapLocationDot, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  return (
    <main className="contenido">
      <section className="hero">
        {/* 👇 HERO CARD CON ANIMACIÓN */}
        <div 
          className="hero__card"
          data-aos="fade-down-right"
          data-aos-duration="1200"  // Duración de la animación
          data-aos-delay="0"        // Sin retraso
        >
          <h2>¡Infórmate, evita, protege!</h2>
          <p>
            Mapas, estadísticas y consejos para moverte seguro en Quito.
            Una decisión informada = una vida a salvo.
          </p>
        </div>

        <div className="beneficios">
          <div 
            className="beneficios__titulo"
            data-aos="zoom-in-up"
            data-aos-delay="0"
          >
            <span>Beneficios</span>
          </div>

          <div className="beneficios__grid">
            <div 
              className="beneficio"
              data-aos="zoom-in-up"
              data-aos-delay="100"
            >
              <FontAwesomeIcon icon={faUserCheck} />
              <h3>Mejor Toma de Decisiones</h3>
            </div>

            <div 
              className="beneficio"
              data-aos="zoom-in-up"
              data-aos-delay="200"
            >
              <FontAwesomeIcon icon={faBell} />
              <h3>Alertas Tempranas</h3>
            </div>

            <div 
              className="beneficio"
              data-aos="zoom-in-up"
              data-aos-delay="300"
            >
              <FontAwesomeIcon icon={faMapLocationDot} />
              <h3>Información Personalizada</h3>
            </div>

            <div 
              className="beneficio"
              data-aos="zoom-in-up"
              data-aos-delay="400"
            >
              <FontAwesomeIcon icon={faShieldHalved} />
              <h3>Prevención para los Usuarios</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;