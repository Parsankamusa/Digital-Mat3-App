import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyComPgJn6ZOOvJaj5PSF7nSQaAH3CTVdc0",
    authDomain: "digital-matatu-chat.firebaseapp.com",
    projectId: "digital-matatu-chat",
    storageBucket: "digital-matatu-chat.appspot.com",
    messagingSenderId: "222856465035",
    appId: "1:222856465035:web:70ca541343ad921b4a628e",
    measurementId: "G-5G5J4T2TQ4"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;