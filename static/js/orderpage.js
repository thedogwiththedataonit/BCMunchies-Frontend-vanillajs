const test = localStorage.getItem("cart");
console.log(test);


cart = JSON.parse(localStorage.getItem("cart"));
    //loop through the cart 
const orderitems = document.getElementById("orderitems");

for (var i = 0; i < cart.length; i++) {
        var li = document.createElement("li");
        li.innerText = cart[i].qty + " x " + cart[i].id;
        
        orderitems.appendChild(li);
    }


function clearCart(){
    localStorage.removeItem("cart");
    location.reload();
    console.log("cart cleared");
}