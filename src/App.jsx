import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/header/Header.jsx";
import Footer from './components/footer/Footer.jsx';
import Landing from './pages/Landing';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import ProtectedRoute from './components/routes/ProtectedRoute.jsx';

const About = lazy(() => import('./pages/About.jsx'));
const Mapas = lazy(() => import('./pages/Mapas.jsx'))
const Login = lazy(() => import('./components/login/Login.jsx'))
const Register = lazy(() => import('./components/register/Register.jsx'))
const Zonas = lazy(() => import('./pages/Zonas.jsx'))
const AdminZonasPage = lazy(() => import('./pages/AdminZonasPage.jsx'))
const Quejas = lazy(() => import('./pages/Quejas.jsx'))
const AccessDenied = lazy(() => import('./pages/AccessDenied.jsx'))
const Perfil = lazy(() => import('./pages/Perfil.jsx'))

import ChatBot from './components/chatbot/ChatBot.jsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Suspense fallback={<p className="route-loader">Cargando...</p>}>
              <Routes>
                {/* Rutas públicas: Inicio, Nosotros, Mapa Interactivo y Zonas
                son visibles sin necesidad de iniciar sesión. */}
                <Route path="/" element={<Landing />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/acceso-denegado" element={<AccessDenied />} />
                <Route path="/mapas" element={<Mapas />} />
                <Route path="/zonas" element={<Zonas />} />

                {/* Rutas protegidas: cualquier usuario autenticado (admin o turista) */}
                <Route
                  path="/perfil"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "turista"]}>
                      <Perfil />
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
            </Suspense>
          </main>
          <ChatBot />
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
