// src/components/map/Map.jsx
import './Map.css';

const Map = () => {
  return (
    <section className="service" id="mapa">
      <div className="service__container">

        <h2 data-aos="fade-up" data-aos-duration="800">Mapa Interactivo</h2>

        <div className="service__content-text" data-aos="fade-down" data-aos-duration="800">
          <p className="service__description">
            Explora el mapa de Quito para ubicar zonas de riesgo, lugares turísticos y
            planificar tus recorridos de forma más segura.
          </p>
        </div>

        <div className="service__row">
          {/* Mapa ocupando todo el ancho */}
          <div className="service__view" data-aos="zoom-in" data-aos-duration="1000">
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
