import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Landing from "./pages/Landing";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";

const About = lazy(() => import("./pages/About.jsx"));
const Mapas = lazy(() => import("./pages/Mapas.jsx"));
const Login = lazy(() => import("./components/login/Login.jsx"));
const Register = lazy(() => import("./components/register/Register.jsx"));
const Zonas = lazy(() => import("./pages/Zonas.jsx"));
const AdminZonasPage = lazy(() => import("./pages/AdminZonasPage.jsx"));
const Quejas = lazy(() => import("./pages/Quejas.jsx"));
const AccessDenied = lazy(() => import("./pages/AccessDenied.jsx"));
const Perfil = lazy(() => import("./pages/Perfil.jsx"));
const Estadisticas = lazy(() => import("./pages/Estadisticas.jsx"));

function App() {
  // El chatbot de Zapier se carga una sola vez desde index.html
  // (antes también se inyectaba aquí, causando que se cargara duplicado).
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header />

          <main>
            <Suspense fallback={<div>Cargando...</div>}>
              <Routes>

                {/* Rutas públicas */}
                <Route path="/" element={<Landing />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/acceso-denegado" element={<AccessDenied />} />
                <Route path="/mapas" element={<Mapas />} />
                <Route path="/zonas" element={<Zonas />} />
                <Route path="/estadisticas" element={<Estadisticas />} />

                {/* Rutas protegidas */}
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

                {/* Solo administrador */}
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

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;