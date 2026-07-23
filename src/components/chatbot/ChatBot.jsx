import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

const KNOWLEDGE = {
  zonasRiesgo: [
    "Zonas de riesgo en Quito: San Roque, La Marin, El Panecillo, Ferrocarril, Quitumbre (sectores perifericos), Cotocollao, El Calzado y San Rafael.",
    "Zonas turisticas seguras: Centro Historico, La Mariscal, Cumbaya, Tumbaco, Iñaquito, Jipijapa, La Carolina."
  ],
  consejos: [
    "Evita usar el celular en la calle en zonas concurridas.",
    "Usa taxis formales o apps de transporte, especialmente de noche.",
    "No camines por calles solitarias en el Centro Historico tras las 8pm.",
    "Manten tus pertenencias siempre a la vista en buses y terminales.",
    "En caso de emergencia, llama al ECU 911."
  ],
  zonasTuristicas: [
    "Centro Historico: Plaza Grande, Catedral, San Francisco.",
    "Mitad del Mundo: a 30 min del norte de Quito.",
    "Teleferico: subida al Pichincha con vistas espectaculares.",
    "Parque La Carolina: ideal para deportes y paseos.",
    "Panecillo: vista panoramica (visitar de dia)."
  ],
  seguridad: [
    "Tasa de homicidios en Quito: 8 por cada 100,000 hab.",
    "Delitos mas comunes: robos (bajando -25%), asaltos.",
    "Zona mas vigilada: Centro Historico y La Mariscal."
  ],
  emergencias: [
    "ECU 911: marca 911 (policia, bomberos, ambulancias).",
    "Policia Nacional: 101",
    "Bomberos Quito: 102",
    "Aeropuerto Mariscal Sucre: (02) 395-4200"
  ]
};

const OPCIONES = [
  { texto: "Zonas de riesgo", clave: "zonasRiesgo" },
  { texto: "Zonas Turisticas", clave: "zonasTuristicas" },
  { texto: "Consejos", clave: "consejos" },
  { texto: "Estadisticas", clave: "seguridad" },
  { texto: "Emergencias", clave: "emergencias" }
];

function ChatBot() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    { texto: "Hola! Soy SafeBot, asistente de seguridad en Quito. En que puedo ayudarte?", emisor: "bot", opciones: true }
  ]);
  const [entrada, setEntrada] = useState("");
  const finRef = useRef(null);

  useEffect(() => {
    if (finRef.current) {
      finRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensajes]);

  function responder(consulta) {
    const q = consulta.toLowerCase();
    if (q.includes("riesgo") || q.includes("peligro")) {
      return KNOWLEDGE.zonasRiesgo[Math.floor(Math.random() * KNOWLEDGE.zonasRiesgo.length)];
    }
    if (q.includes("tur") || q.includes("visitar") || q.includes("lugar")) {
      return KNOWLEDGE.zonasTuristicas[Math.floor(Math.random() * KNOWLEDGE.zonasTuristicas.length)];
    }
    if (q.includes("consejo") || q.includes("seguro") || q.includes("cuidado")) {
      return KNOWLEDGE.consejos[Math.floor(Math.random() * KNOWLEDGE.consejos.length)];
    }
    if (q.includes("estad") || q.includes("delito") || q.includes("tasa")) {
      return KNOWLEDGE.seguridad[Math.floor(Math.random() * KNOWLEDGE.seguridad.length)];
    }
    if (q.includes("emerg") || q.includes("911") || q.includes("ayuda")) {
      return KNOWLEDGE.emergencias[Math.floor(Math.random() * KNOWLEDGE.emergencias.length)];
    }
    if (q.includes("hola") || q.includes("gracias")) {
      return "Hola! Puedes preguntarme sobre zonas de riesgo, turismo, consejos o emergencias en Quito.";
    }
    return "No tengo info sobre eso. Elige una opcion rapida o pregunta sobre zonas de riesgo, turismo, consejos o emergencias.";
  }

  function enviar() {
    if (entrada.trim() === "") return;
    setMensajes(prev => prev.concat([{ texto: entrada, emisor: "user" }]));
    const resp = responder(entrada);
    setTimeout(() => {
      setMensajes(prev => prev.concat([{ texto: resp, emisor: "bot", opciones: true }]));
    }, 500);
    setEntrada("");
  }

  function opcionRapida(clave) {
    const textos = KNOWLEDGE[clave];
    const idx = Math.floor(Math.random() * textos.length);
    const texto = textos[idx];
    const opt = OPCIONES.find(o => o.clave === clave);
    setMensajes(prev => prev.concat([{ texto: opt ? opt.texto : clave, emisor: "user" }]));
    setTimeout(() => {
      setMensajes(prev => prev.concat([{ texto, emisor: "bot", opciones: true }]));
    }, 500);
  }

  const botonesOpciones = OPCIONES.map((opt, idx) => (
    <button key={idx} className="chatbot-option-btn" onClick={() => opcionRapida(opt.clave)}>
      {opt.texto}
    </button>
  ));

  return (
    <div className="chatbot-wrapper">
      <button
        className={"chatbot-toggle" + (abierto ? " open" : "")}
        onClick={() => setAbierto(prev => !prev)}
      >
        {abierto ? <FaTimes /> : <FaRobot />}
      </button>
      {abierto && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span className="chatbot-status"></span>
            <h3>SafeBot Asistente</h3>
          </div>
          <div className="chatbot-messages">
            {mensajes.map((msg, i) => (
              <div key={i}>
                <div className={"chatbot-message " + msg.emisor}>
                  {msg.emisor === "bot" ? "🤖 " : ""}{msg.texto}
                </div>
                {msg.opciones && msg.emisor === "bot" && (
                  <div className="chatbot-options">{botonesOpciones}</div>
                )}
              </div>
            ))}
            <div ref={finRef}></div>
          </div>
          <div className="chatbot-input-area">
            <input
              value={entrada}
              onChange={e => setEntrada(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") enviar(); }}
              placeholder="Escribe tu pregunta..."
            />
            <button className="chatbot-send-btn" onClick={enviar}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
