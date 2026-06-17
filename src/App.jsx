import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/header/Header.jsx";
// Importa tus páginas aquí
import Landing from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;