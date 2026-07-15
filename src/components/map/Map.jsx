// src/components/map/Map.jsx
import { useState } from 'react';
import './Map.css';

const Map = () => {
  const [parroquia, setParroquia] = useState('');
  const [barrioSector, setBarrioSector] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se podría integrar la búsqueda real de zonas.
    console.log('Buscando:', { parroquia, barrioSector });
  };

  return (
    <section className="service" id="mapa">
      <div className="service__container">

        <h2 data-aos="fade-up" data-aos-duration="800">Mapa Interactivo:</h2>

        <div className="service__row">

          {/* Lado izquierdo: texto y formulario */}
          <div className="service__content" data-aos="fade-right" data-aos-duration="1000">
            <p className="service__description">
              Investiga datos de riesgo estadísticos de diversas zonas de Quito con el siguiente mapa
            </p>

            <form className="service__form" onSubmit={handleSubmit}>
              <div className="service__form-group">
                <label htmlFor="parroquia">Parroquia</label>
                <input
                  type="text"
                  id="parroquia"
                  name="parroquia"
                  placeholder="Ej: Quitumbe"
                  value={parroquia}
                  onChange={(e) => setParroquia(e.target.value)}
                />
              </div>

              <div className="service__form-group">
                <label htmlFor="barrio-sector">Barrio/Sector:</label>
                <input
                  type="text"
                  id="barrio-sector"
                  name="barrio-sector"
                  placeholder="Ej: La Carolina"
                  value={barrioSector}
                  onChange={(e) => setBarrioSector(e.target.value)}
                />
              </div>

              <button type="submit" className="service__btn">BUSCAR</button>
            </form>
          </div>

          {/* Lado derecho: mapa */}
          <div className="service__view" data-aos="fade-left" data-aos-duration="1000">
            <iframe
              title="Mapa de Quito"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36664.7002689804!2d-78.37615861879571!3d-0.12182058381663866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d58db4352baa87%3A0x2f9f7623e0894b8b!2sAeropuerto%20Internacional%20Mariscal%20Sucre!5e0!3m2!1ses!2sec!4v1777845379531!5m2!1ses!2sec"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Map;
