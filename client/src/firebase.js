// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "casickestate12.firebaseapp.com",
  projectId: "casickestate12",
  storageBucket: "casickestate12.appspot.com",
  messagingSenderId: "344350093792",
  appId: "1:344350093792:web:6fca3875a47eab10477b85"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);

 export default app;