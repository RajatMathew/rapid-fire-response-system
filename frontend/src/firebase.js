import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
// import firebase from 'firebase';



const config = {
    apiKey: "AIzaSyAxgFUnEC86-EV4vTdP2OF2PyZpqfezR3A",
    authDomain: "nasa-d9822.firebaseapp.com",
    databaseURL: "https://nasa-d9822-default-rtdb.firebaseio.com",
    projectId: "nasa-d9822",
    storageBucket: "nasa-d9822.appspot.com",
    messagingSenderId: "803691422915",
    appId: "1:803691422915:web:347015fb0c204e6b79ae76",
    measurementId: "G-W8R1ZBYC3P"
};

// Initialize firebase app.
const app = initializeApp(config);
// Initialize firebase database and get the reference of firebase database object.
const database = getDatabase(app);