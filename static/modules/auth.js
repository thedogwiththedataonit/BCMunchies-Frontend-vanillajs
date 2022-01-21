 // Import the functions you need from the SDKs you need
        
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
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

const signinbtn = document.getElementById("signinbtn");
const signupbtn = document.getElementById("signupbtn");
const signoutbtn = document.getElementById("signout");
const nameline = document.getElementById("nameline");
const noteline = document.getElementById("noteline");

signupbtn.onclick = () => auth.signInWithPopup(provider); //await response then show a popup
signinbtn.onclick = () => auth.signInWithPopup(provider);
signoutbtn.onclick = () => auth.signOut();

const username = document.getElementById("username");

auth.onAuthStateChanged(user => {
            if (user) {
                //remove "is-visible" class from login modal
                document.getElementById("loginmodal").className = "user-modal";
                //slide in and out confirmed
                console.log(user);
                username.innerHTML = `${user.displayName} is signed in as ${user.email} => ${user.uid}`;
                nameline.innerText = `Hey, ${user.displayName}!`;
                noteline.innerText = "Lets get ordering.";

                
            } else {
                console.log("not logged in");
                username.innerHTML = "Not logged in";
                nameline.innerText = "Fast and Simple.";
                noteline.innerText = "Just for BC.";
                
            }
});


const orderbutton = document.getElementById("orderbutton");
orderbutton.onclick = () => {
    var user = firebase.auth().currentUser;
    if(user == null){
        window.location.href = "/order";
    }
    else{
        window.location.href = "/order";
    }
};

export { initializeApp, firebaseConfig, app, auth, provider };
