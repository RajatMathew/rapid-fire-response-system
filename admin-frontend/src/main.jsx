import React from 'react'
import ReactDOM from 'react-dom/client'

// import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './components/Root';
import LocationData from './LocationData';

import Analyze from './components/Analyze';
import ErrorPage from "./components/ErrorPage/ErrorPage";


import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import VerifyData from './components/VerifyData/index.jsx';
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
export const db = getDatabase(app);









const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Analyze />, 
      },
      {
        path: "/track-drone",
        element: <LocationData />,
      },
      {
        path: "/verify",
        element: <VerifyData />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
