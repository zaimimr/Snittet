import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIRE_API_KEY,
  authDomain: "snittet-49dac.firebaseapp.com",
  projectId: "snittet-49dac",
  storageBucket: "snittet-49dac.appspot.com",
  messagingSenderId: "13402230861",
  appId: "1:13402230861:web:ecef2b9efadd4fd33e8c04",
  measurementId: "G-TM9Z0EC35S",
});

const db = firebaseApp.firestore();

export { db };
