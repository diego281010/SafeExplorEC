// src/utils/socialAuth.js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { authFirebase, dbFirebase } from "../firebase";

export const googleProvider = new GoogleAuthProvider();
// Fuerza a que siempre se muestre el selector de cuenta de Google
googleProvider.setCustomParameters({ prompt: "select_account" });

/**
 * Inicia sesión (o registra, si es la primera vez) con Google.
 * Si el usuario no tiene todavía un documento en /Users, se crea uno
 * con rol "turista" por defecto, igual que en el registro manual.
 */
export async function loginConGoogle() {
  const result = await signInWithPopup(authFirebase, googleProvider);
  const user = result.user;

  const userRef = doc(dbFirebase, "Users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    const partesNombre = (user.displayName || "Usuario").trim().split(" ");
    const nombre = partesNombre.shift() || "Usuario";
    const apellido = partesNombre.join(" ");

    await setDoc(userRef, {
      nombre,
      apellido,
      email: (user.email || "").toLowerCase(),
      telefono: "",
      cedula: "",
      rol: "turista",
      fotoUrl: user.photoURL || "",
      proveedor: "google",
      createdAt: serverTimestamp(),
    });
  }

  return user;
}
