import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/header/Header.jsx";
// Importa tus páginas aquí
import Landing from './pages/Landing';
import Footer from './components/footer/Footer.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;