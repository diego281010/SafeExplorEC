import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/header/Header.jsx";
import Landing from './pages/Landing';
import About from './pages/About.jsx';
import Mapas from './pages/Mapas.jsx';
import Footer from './components/footer/Footer.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Perfil from './pages/Perfil.jsx';
import Zonas from './pages/Zonas.jsx';
import AdminZonasPage from './pages/AdminZonasPage.jsx';
import Quejas from './pages/Quejas.jsx';
import AccessDenied from './pages/AccessDenied.jsx';
import ChatBot from './components/chatbot/ChatBot.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/routes/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Landing />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/acceso-denegado" element={<AccessDenied />} />

            {/* Rutas protegidas: cualquier usuario autenticado */}
            <Route
              path="/mapas"
              element={
                <ProtectedRoute allowedRoles={["admin", "turista"]}>
                  <Mapas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute allowedRoles={["admin", "turista"]}>
                  <Perfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/zonas"
              element={
                <ProtectedRoute allowedRoles={["admin", "turista"]}>
                  <Zonas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quejas"
              element={
                <ProtectedRoute allowedRoles={["admin", "turista"]}>
                  <Quejas />
                </ProtectedRoute>
              }
            />

            {/* Ruta protegida: solo administrador */}
            <Route
              path="/admin/zonas"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminZonasPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <ChatBot />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
