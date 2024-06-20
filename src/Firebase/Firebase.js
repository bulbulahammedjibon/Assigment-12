// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    
        apiKey: "AIzaSyBi8hBal-dGpYk_vJcFywXXOBDl2M6A51k",
        authDomain: "real-state-assigment-12.firebaseapp.com",
        projectId: "real-state-assigment-12",
        storageBucket: "real-state-assigment-12.appspot.com",
        messagingSenderId: "470628822863",
        appId: "1:470628822863:web:e18290fa1868d9bf901f3a"
       

    // apiKey: import.meta.env.VITE_APIKEY,
    // authDomain: import.meta.env.VITE_AUTHDOMAIN,
    // projectId: import.meta.env.VITE_PROJECTID,
    // storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    // messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    // appId: import.meta.env.VITE_APPID,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;