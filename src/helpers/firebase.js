// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDayQNuzqtuXFOMS8KtQ_ydDDP-5cOKYlY",
  authDomain: "fireact-soltani.firebaseapp.com",
  projectId: "fireact-soltani",
  storageBucket: "fireact-soltani.appspot.com",
  messagingSenderId: "993041515803",
  appId: "1:993041515803:web:533b3b33b1895dcd1d7fbe",
  measurementId: "G-L41P8BLJVV",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const messaging = () => getMessaging(firebaseApp);
export default firebaseApp;
