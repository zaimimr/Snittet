import 'firebase/firestore'

import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyDIrKiNgeeXiIuvGivIaVStwTZQmSVzV3A",
  authDomain: "snittet-49dac.firebaseapp.com",
  projectId: "snittet-49dac",
  storageBucket: "snittet-49dac.appspot.com",
  messagingSenderId: "13402230861",
  appId: "1:13402230861:web:ecef2b9efadd4fd33e8c04",
  measurementId: "G-TM9Z0EC35S",
});

const db = firebase.firestore();
firebase.analytics();
export { db };
