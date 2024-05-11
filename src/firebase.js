import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "chat-app-59252.firebaseapp.com",
  projectId: "chat-app-59252",
  storageBucket: "chat-app-59252.appspot.com",
  messagingSenderId: "882884582003",
  appId: "1:882884582003:web:12c1b91f0a7925fa4fa806"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);

