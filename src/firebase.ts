import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDakI9hxU_hekAFMX3vvqLC7DesuevA2EA",
  authDomain: "entertainment-web-app-b6dc8.firebaseapp.com",
  projectId: "entertainment-web-app-b6dc8",
  storageBucket: "entertainment-web-app-b6dc8.appspot.com",
  messagingSenderId: "123065684770",
  appId: "1:123065684770:web:f1f2631f4c40b0d4d24b7b",
  measurementId: "G-3540K9JPYK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);