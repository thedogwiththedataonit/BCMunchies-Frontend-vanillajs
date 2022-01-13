import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
        // Your web app's Firebase configuration
const firebaseConfig = {
          apiKey: "AIzaSyAwDM2bpJv-Cf8QMvmN69H1LagIqpzBHEk",
          authDomain: "bc-munchies-dev.firebaseapp.com",
          projectId: "bc-munchies-dev",
          storageBucket: "bc-munchies-dev.appspot.com",
          messagingSenderId: "970170987232",
          appId: "1:970170987232:web:4695ef3ec353096e659685"
        };
        
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { initializeApp, firebaseConfig, app, auth, provider };