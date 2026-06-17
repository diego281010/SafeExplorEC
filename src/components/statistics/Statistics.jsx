import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMask, faGun, faHandcuffs } from '@fortawesome/free-solid-svg-icons';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import './Statistics.css';

const Quito = () => {
  return (
    <section className="quito">
      <h1>Tasas y Estadísticas de Criminalidad en Quito en 2026</h1>

      <div className="quito__content">
        <div className="tabs-wrapper">

          <Tabs>
            <TabList className="quito-tabs">
              <Tab>Robos</Tab>
              <Tab>Homicidios</Tab>
              <Tab>Tasa Anual</Tab>
            </TabList>

            <TabPanel>
              <div className="stat-card">
                <FontAwesomeIcon icon={faMask} />
                <h2>Robos</h2>
                <p className="porcentaje">-25%</p>
                <p className="casos">3,100 casos</p>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="stat-card">
                <FontAwesomeIcon icon={faGun} />
                <h2>Homicidios</h2>
                <p className="porcentaje">+22%</p>
                <p className="casos">67 casos en el trimestre</p>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="stat-card">
                <FontAwesomeIcon icon={faHandcuffs} />
                <h2>Tasa Anual</h2>
                <p className="porcentaje">8</p>
                <p className="casos">
                  Homicidios por cada 100.000 habitantes
                </p>
              </div>
            </TabPanel>
          </Tabs>

        </div>

        <img
          src="./src/images/section_quito.jpg"
          alt="quito"
          className="quito-img"
        />
      </div>

      <button className="btn btn__info">
        Más información
      </button>
    </section>
  );
};






export default Quito;

