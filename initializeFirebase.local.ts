// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLAHSr9zt1ctSSRtO68a-oCB52_ELMlSc",
    authDomain: "fir-db-1-c823a.firebaseapp.com",
    projectId: "fir-db-1-c823a",
    storageBucket: "fir-db-1-c823a.appspot.com",
    messagingSenderId: "594726334077",
    appId: "1:594726334077:web:aba6316181a75db2964b14",
    measurementId: "G-2967V5HTBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const matchesCollectionRef = collection(db, 'matches');
export const notificationsCollectionRef = collection(db, 'notifications');