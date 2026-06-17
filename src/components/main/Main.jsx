import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faBell, faMapLocationDot, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  return (
    <main className="contenido">
      <section className="hero">
        <div className="hero__card">
          <h2>¡Infórmate, evita, protege!</h2>
          <p>
            Mapas, estadísticas y consejos para moverte seguro en Quito.
            Una decisión informada = una vida a salvo.
          </p>
          <a href="#" className="btn">Más Información</a>
        </div>

        <div className="beneficios">
          <div className="beneficios__titulo">
            <span>Beneficios</span>
          </div>

          <div className="beneficios__grid">
            <div className="beneficio">
              <FontAwesomeIcon icon={faUserCheck} />
              <h3>Mejor Toma de Decisiones</h3>
            </div>

            <div className="beneficio">
              <FontAwesomeIcon icon={faBell} />
              <h3>Alertas Tempranas</h3>
            </div>

            <div className="beneficio">
              <FontAwesomeIcon icon={faMapLocationDot} />
              <h3>Información Personalizada</h3>
            </div>

            <div className="beneficio">
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