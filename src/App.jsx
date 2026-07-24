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
import Estadisticas from './pages/Estadisticas.jsx';
import AdminZonasPage from './pages/AdminZonasPage.jsx';
import Quejas from './pages/Quejas.jsx';
import AccessDenied from './pages/AccessDenied.jsx';
import ChatBot from './components/chatbot/ChatBot.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import ProtectedRoute from './components/routes/ProtectedRoute.jsx';

function AppToastContainer() {
  const { isDark } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme={isDark ? "dark" : "light"}
    />
  );
}

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <AppToastContainer />
        <Header />
        <main>
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
            {/* Estadísticas es pública: accesible desde el botón de la
                sección "Tasas y Estadísticas" del landing sin necesidad
                de iniciar sesión. */}
            <Route path="/estadisticas" element={<Estadisticas />} />

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
        </main>
        <ChatBot />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
