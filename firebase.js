import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore, collection, doc, getDocs, writeBatch } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAr2eo8Zr68FxTRRHf82N95eI3C_gV7YCQ",
  authDomain: "aa-shop-5811f.firebaseapp.com",
  projectId: "aa-shop-5811f",
  storageBucket: "aa-shop-5811f.firebasestorage.app",
  messagingSenderId: "174463369993",
  appId: "1:174463369993:web:6b0151ba2506a0cbefc9d8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function readCart(user) {
  const snapshot = await getDocs(collection(db, "users", user.uid, "cartItems"));
  return snapshot.docs.map(item => ({ id: item.data().productId || item.id, ...item.data() }));
}

export async function writeCart(user, items) {
  const cartRef = collection(db, "users", user.uid, "cartItems");
  const existing = await getDocs(cartRef);
  const wanted = new Set(items.map(item => String(item.id)));
  const batch = writeBatch(db);
  existing.docs.forEach(item => {
    if (!wanted.has(item.data().productId || item.id)) batch.delete(item.ref);
  });
  items.forEach(item => {
    const productId = String(item.id);
    batch.set(doc(cartRef, encodeURIComponent(productId)), {
      productId,
      name: String(item.name || ""),
      price: Number(item.price) || 0,
      image: String(item.image || ""),
      quantity: Math.max(1, Math.min(99, Math.floor(Number(item.quantity) || 1)))
    });
  });
  await batch.commit();
}