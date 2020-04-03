import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from "firebase";

//TODO use Material UI instead of MDB
//TODO import MUI components separately to increase build time!!!

// import mdb styles
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


// Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyBG8vXEMkwVY9vIHhmxoQ5YuW4kOOV-UHA",
    authDomain: "dnd-session-organizer.firebaseapp.com",
    databaseURL: "https://dnd-session-organizer.firebaseio.com",
    projectId: "dnd-session-organizer",
    storageBucket: "dnd-session-organizer.appspot.com",
    messagingSenderId: "956829420098",
    appId: "1:956829420098:web:29a5e0ad60d54eb7b23bdb",
    measurementId: "G-24RB0Q38DL"
};

//TODO put firebase app to context from here

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App/>, document.getElementById('root'));
