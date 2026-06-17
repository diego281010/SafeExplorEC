// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./normalize.css";
import 'aos/dist/aos.css'; // 👈 Importar estilos de AOS
import AOS from 'aos';      // 👈 Importar AOS

// 👇 Inicializar AOS
AOS.init({
  duration: 1000,    // Duración de la animación en ms
  once: true,        // La animación solo se ejecuta una vez
  offset: 100,       // Distancia desde el viewport
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)