import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMask, faGun, faHandcuffs } from '@fortawesome/free-solid-svg-icons';
import './Statistics.css'; // Asegúrate de tener tus estilos aquí

const Quito = () => {
  return (
    <section className="quito">
      <h2>Tasas y Estadísticas de Criminalidad en Quito en 2026</h2>
      
      <div className="quito__content">
        <ul>
          <li>
            <div className="robos__container">
              <FontAwesomeIcon icon={faMask} />
              <h2 className="robos">Robos</h2>
              <p className="porcentaje">-25%</p>
              <p className="casos">3,100 casos</p>
            </div>
          </li>
          
          <li>
            <div className="homicidios__container">
              <FontAwesomeIcon icon={faGun} />
              <h2 className="homicidios">Homicidios</h2>
              <p className="porcentaje">+22%</p>
              <p className="casos">67 casos en el trimestre</p>
            </div>
          </li>
          
          <li>
            <div className="tasa__container">
              <FontAwesomeIcon icon={faHandcuffs} />
              <h2 className="tasa">Tasa Anual</h2>
              <p className="porcentaje">8</p>
              <p className="casos">Homicidios por cada 100.000 habitantes</p>
            </div>
          </li>
        </ul>
        
        <img src="./src/images/section_quito.jpg" alt="quito" className="quito-img" />
      </div>
      
      <button className="btn btn__info">Más información</button>
    </section>
  );
};

export default Quito;