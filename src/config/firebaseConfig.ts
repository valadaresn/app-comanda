import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCqTKH8yuXYhZjW5TxZxDU3aY_rHfT4zlo",
  authDomain: "eorder-ba17c.firebaseapp.com",
  projectId: "eorder-ba17c",
  storageBucket: "eorder-ba17c.firebasestorage.app",
  messagingSenderId: "544528581262",
  appId: "1:544528581262:web:f989f0e656808f13447fdf",
  measurementId: "G-1K94253V27"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const defaultDb = getFirestore(app);

// Objeto para nomes das coleções
export const collectionNames = {
  categories: "categories",
  products: "products",
  bills: "bills",
  tables: "tables",
  orders: "orders",
  orderItems: "orderItems",
  // Adicione outras coleções conforme necessário
};