import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { authFirebase, dbFirebase } from "../firebase";

// Contexto global de autenticación.
// Expone: user (objeto de Firebase Auth), userData (documento en /Users con rol y perfil),
// rol ("admin" | "turista"), loading (mientras se resuelve el estado inicial) y isAdmin.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubUserDoc = null;

    const unsubAuth = onAuthStateChanged(authFirebase, (firebaseUser) => {
      // Si había una suscripción anterior al documento del usuario, se cierra.
      if (unsubUserDoc) {
        unsubUserDoc();
        unsubUserDoc = null;
      }

      setUser(firebaseUser);

      if (firebaseUser) {
        const userRef = doc(dbFirebase, "Users", firebaseUser.uid);
        unsubUserDoc = onSnapshot(
          userRef,
          (snap) => {
            setUserData(snap.exists() ? snap.data() : null);
            setLoading(false);
          },
          (error) => {
            console.log(error);
            setUserData(null);
            setLoading(false);
          }
        );
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      unsubAuth();
      if (unsubUserDoc) unsubUserDoc();
    };
  }, []);

  const rol = userData?.rol || null;

  const value = {
    user,
    userData,
    rol,
    isAdmin: rol === "admin",
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
