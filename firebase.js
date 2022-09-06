import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAhG_PbGX_3kYjqVIIV8okpGM61SEyq3mY",
  authDomain: "atoz-d5e94.firebaseapp.com",
  projectId: "atoz-d5e94",
  storageBucket: "atoz-d5e94.appspot.com",
  messagingSenderId: "523222142219",
  appId: "1:523222142219:web:250ad104e247ffe689a60e",
  measurementId: "G-3VV1R82WQG",
};

let Firebase;
if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
