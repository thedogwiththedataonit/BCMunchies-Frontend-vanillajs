import { initializeApp, firebaseConfig, app, auth, provider } from "./auth_order.js";

//on body load
//onload grab the url
//if the url is /order/uid

//onload console.log the url

const body = document.getElementsByTagName("body")[0];
const username = document.getElementById("username");
const usernameCheckout = document.getElementById("usernameCheckout");

body.onload = () => {

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log(user);
            console.log(user.displayName);
            //add user.displayName to id="username"
            username.innerHTML = user.displayName;
            usernameCheckout.innerHTML = `Order for ${user.displayName.split(" ")[0]}`;
        }
        else {
            console.log("not logged in");
            username.innerHTML = "Not logged in";
        
        }
    });
        
};


/*
{
    var user = firebase.auth().getUser(uid);
    if(user == null){
        console.log("not logged in");
    }
    else{
        var userId = user.uid;
        console.log(userId);
        
    }
};
*/