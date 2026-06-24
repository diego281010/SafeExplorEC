import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/header/Header.jsx";
// Importa tus páginas aquí
import Landing from './pages/Landing';
import Footer from './components/footer/Footer.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;