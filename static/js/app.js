jQuery(document).ready(function($){
    var $form_modal = $('.user-modal'),
      $form_login = $form_modal.find('#login'),
      $form_signup = $form_modal.find('#signup'),
      $form_forgot_password = $form_modal.find('#reset-password'),
      $form_modal_tab = $('.switcher'),
      $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
      $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
      $forgot_password_link = $form_login.find('.form-bottom-message a'),
      $back_to_login_link = $form_forgot_password.find('.form-bottom-message a'),
      $main_nav = $('.main-nav');
      $mainlogin = $('.mainlogin');
    //open modal
    $main_nav.on('click', function(event){
  
      if( $(event.target).is($main_nav) ) {
        // on mobile open the submenu
        $(this).children('ul').toggleClass('is-visible');
      } 
      else {
        // on mobile close submenu
        $main_nav.children('ul').removeClass('is-visible');
        //show modal layer
        $form_modal.addClass('is-visible'); 
        //show the selected form
        ( $(event.target).is('#signupclick') ) ? signup_selected() : login_selected();
      }
  
    });

    
    //close modal
    $('.user-modal').on('click', function(event){
      if( $(event.target).is($form_modal) || $(event.target).is('.close-form') ) {
        $form_modal.removeClass('is-visible');
      } 
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
          $form_modal.removeClass('is-visible');
        }
      });
  
    //switch from a tab to another
    $form_modal_tab.on('click', function(event) {
      event.preventDefault();
      ( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
    });
  
    //hide or show password
    $('.hide-password').on('click', function(){
      var $this= $(this),
        $password_field = $this.prev('input');
      
      ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
      ( 'Show' == $this.text() ) ? $this.text('Hide') : $this.text('Show');
      //focus and move cursor to the end of input field
      $password_field.putCursorAtEnd();
    });
  
    //show forgot-password form 
    $forgot_password_link.on('click', function(event){
      event.preventDefault();
      forgot_password_selected();
    });
  
    //back to login from the forgot-password form
    $back_to_login_link.on('click', function(event){
      event.preventDefault();
      login_selected();
    });
  
    function login_selected(){
      $form_login.addClass('is-selected');
      $form_signup.removeClass('is-selected');
      $form_forgot_password.removeClass('is-selected');
      $tab_login.addClass('selected');
      $tab_signup.removeClass('selected');
    }
  
    function signup_selected(){
      $form_login.removeClass('is-selected');
      $form_signup.addClass('is-selected');
      $form_forgot_password.removeClass('is-selected');
      $tab_login.removeClass('selected');
      $tab_signup.addClass('selected');
    }
  
    function forgot_password_selected(){
      $form_login.removeClass('is-selected');
      $form_signup.removeClass('is-selected');
      $form_forgot_password.addClass('is-selected');
    }
  
    //REMOVE THIS - it's just to show error messages 
    $form_login.find('input[type="submit"]').on('click', function(event){
      event.preventDefault();
      $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
    $form_signup.find('input[type="submit"]').on('click', function(event){
      event.preventDefault();
      $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
  
  
    //IE9 placeholder fallback
    //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
    if(!Modernizr.input.placeholder){
      $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
          }
      }).blur(function() {
        var input = $(this);
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
          input.val(input.attr('placeholder'));
          }
      }).blur();
      $('[placeholder]').parents('form').submit(function() {
          $(this).find('[placeholder]').each(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
          }
          })
      });
    }
  
  });
  
  
  //credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
  jQuery.fn.putCursorAtEnd = function() {
    return this.each(function() {
        // If this function exists...
        if (this.setSelectionRange) {
            // ... then use it (Doesn't work in IE)
            // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
            var len = $(this).val().length * 2;
            this.setSelectionRange(len, len);
        } else {
          // ... otherwise replace the contents with itself
          // (Doesn't work in Google Chrome)
            $(this).val($(this).val());
        }
    });
  };


  
function signinEmail(){
    var email = document.getElementById("signin-email").value;
    var password = document.getElementById("signin-password").value;
    console.log(email);
    console.log(password);
    var auth = firebase.auth();
    var promise = auth.signInWithEmailAndPassword(email, password).then(function(){
      modal = document.getElementById("loginmodal");
      modal.className = "user-modal";
      return alert("You have successfully logged in!");
    }).catch(function(error){
      alert(error.message);
    });
    promise.catch(e => console.log(e.message));

}

function signupEmail(){
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;
    var username = document.getElementById("signup-username").value;
    console.log(email);
    console.log(password);
    console.log(username);

    var auth = firebase.auth();
    var promise = auth.createUserWithEmailAndPassword(email, password).then(function(result) {
      modal = document.getElementById("loginmodal");
      modal.className = "user-modal";
      alert("Account Created!");
      return result.user.updateProfile({
        displayName: username
      })
    }).catch(function(error) {
      alert(error.message);
    });
    //if error then display error
    promise.catch(e => console.log(e.message));
}

async function getCategory(category){
  //search local storage for menu
  var menu = JSON.parse(localStorage.getItem("menu"));
  var categoryMenu = [];
  //loop through menu
  for(var i = 0; i < menu.length; i++){
    //if menu category matches category
    if (category == "all"){
      categoryMenu.push(menu[i]);
    }
    if(menu[i].category == category){
      //push to categoryMenu
      categoryMenu.push(menu[i]);
    }
  }
  var itemcontainer = document.getElementById("itemcontainer");
  itemcontainer.innerHTML = "";
  
  for (var i = 0; i < categoryMenu.length; i++){
      await delay(150);
      var foodItem = document.createElement("div");
      foodItem.className = "food-item";
      foodItem.id = "food-item" + i;
      foodItem.innerHTML = `<div class="food-item-img">
                                <img src="/static/img/${categoryMenu[i].img}">
                            </div> 
                            <div class="food-item-text">
                                <h3>${categoryMenu[i].name}</h3>
                                <i>${categoryMenu[i].description}</i>
                            </div>
                            <div class="food-item-add">
                                <p>$${categoryMenu[i].price}</p>
                                <a class="bttn-two2" onclick="addToCart('${categoryMenu[i].id}')">Add to Cart</a>
                            </div>`;
      //append foodItem to itemContainer
      
      itemcontainer.appendChild(foodItem);
    
      }
  
  return categoryMenu;
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function query_items(){
  fetch("/api/menu").then(function(response){
    return response.json();
  }
  ).then(function(data){
    //store data in local storage
    localStorage.setItem("menu", JSON.stringify(data));

    for(var i = 0; i < data.length; i++){
      var itemcontainer = document.getElementById("itemcontainer");
      //create a div with class "food-item" and id="food-item[i]"
      var foodItem = document.createElement("div");
      foodItem.className = "food-item";
      foodItem.id = data[i].name;
      foodItem.innerHTML = `<div class="food-item-img">
                                <img src="/static/img/${data[i].img}">
                            </div> 
                            <div class="food-item-text">
                                <h3>${data[i].name}</h3>
                                <i>${data[i].description}</i>
                            </div>
                            <div class="food-item-add">
                                <p>$${data[i].price}</p>
                                <a class="bttn-two2" onclick="addToCart('${data[i].id}')">Add to Cart</a>
                            </div>`;
      //append foodItem to itemContainer
      itemcontainer.appendChild(foodItem);
    }
  }
  ).catch(function(error){
    console.log(error);
  });

  //get current cart from local storage and display it in object
  cartload();
}

async function cartload(){
  var current_cart = JSON.parse(localStorage.getItem("cart"));

  if(current_cart == null){
    var cartnum = document.getElementById("cartnum");
    cartnum.innerText = 0;
    return;
  }
  else{
    var ordercontainer = document.getElementById("ordercontainer");
    var menu = JSON.parse(localStorage.getItem("menu"));
    console.log(menu)
  //loop through cart
    for (var i = 0; i < current_cart.length; i++){
      var item_id = current_cart[i].id;
      var item_count = current_cart[i].qty;
      console.log(item_id);
      console.log(item_count);


      for (var j = 0; j < menu.length; j++){
        //if id matches menu id
        if(menu[j].id == item_id){
          var item_img = menu[j].img;
          console.log(item_img);
          var item_name = menu[j].name;
          var item_price = menu[j].price;
        
          var orderitem = document.createElement("div");
          orderitem.className = "itemrow";
          orderitem.id = item_id + "_order";
          orderitem.innerHTML = `<div class="content">
                                    <img class="itemimg" src="/static/img/${item_img}"/>
                                    <div class="counterbox">
                                        <img src="https://img.icons8.com/windows/20/000000/minus.png" onClick="minusItem('${item_id}')"/>
                                        <h3 id="itemcount_${item_id}">${item_count}</h3>
                                        <img src="https://img.icons8.com/windows/20/000000/plus.png" onClick="plusItem('${item_id}')"/>
                                    </div>
                                    
                                    <h2>${item_name}</h2>
                                    <p>${item_price}</p>
                                </div>`;
          await delay(250);
          ordercontainer.appendChild(orderitem);
        }
      }

    }
  }
}




function addToCart(id){
  console.log(id)
  var current_cart = localStorage.getItem('cart');
  var ordercontainer = document.getElementById("ordercontainer");
  var cartnum = document.getElementById("cartnum");
  cartnum.innerText = parseInt(cartnum.innerText) + 1;

  var item_id = id;
  var menu = JSON.parse(localStorage.getItem("menu"));
  
  //loop through menu
  for(var i = 0; i < menu.length; i++){
    console.log(menu[i]);
    //if id matches menu id
    if(menu[i].id == item_id){
      var item_img = menu[i].img;
      var item_name = menu[i].name;
      var item_price = menu[i].price;
    }
  }

  var itemnotif = document.getElementById("itemaddedpopup");
  itemnotif.className = "itemaddedpopup visible";
  setTimeout(function(){
    itemnotif.className = "itemaddedpopup";
  }, 2000);

  if(current_cart == null){
    current_cart = [
      {'id': id, 'qty': 1}
    ];
    localStorage.setItem('cart', JSON.stringify(current_cart));
    
    var orderitem = document.createElement("div");
    orderitem.className = "itemrow";
    //id name is item_id
    orderitem.id = item_id + "_order";
    orderitem.innerHTML = `<div class="content">
                              <img class="itemimg" src="/static/img/${item_img}"/>
                              <div class="counterbox">
                                  <img src="https://img.icons8.com/windows/20/000000/minus.png" onClick="minusItem('${item_id}')"/>
                                  <h3 id="itemcount_${item_id}">1</h3>
                                  <img src="https://img.icons8.com/windows/20/000000/plus.png" onClick="plusItem('${item_id}')"/>
                              </div>
                              
                              <h2>${item_name}</h2>
                              <p>${item_price}</p>
                          </div>`;
    ordercontainer.appendChild(orderitem);
  }
  else{
    current_cart = JSON.parse(current_cart);
    var found = false;
    var itemcount = document.getElementById("itemcount_" + id);

    for(var i = 0; i < current_cart.length; i++){
      if(current_cart[i].id == id){
        current_cart[i].qty++;
        found = true;
        localStorage.setItem('cart', JSON.stringify(current_cart));
        itemcount.innerText = current_cart[i].qty;

      }
    }
    if(!found){
      current_cart.push({'id': id, 'qty': 1});
      localStorage.setItem('cart', JSON.stringify(current_cart));

      var orderitem = document.createElement("div");
      orderitem.className = "itemrow";
      orderitem.id = item_id + "_order";
      orderitem.innerHTML = `<div class="content">
                                <img class="itemimg" src="/static/img/${item_img}"/>
                                <div class="counterbox">
                                    <img src="https://img.icons8.com/windows/20/000000/minus.png" onclick="minusItem('${item_id}')"/>
                                    <h3 id="itemcount_${item_id}">1</h3>
                                    <img src="https://img.icons8.com/windows/20/000000/plus.png" onclick="plusItem('${item_id}')"/>
                                </div>
                                
                                <h2>${item_name}</h2>
                                <p>${item_price}</p>
                            </div>`;
      ordercontainer.appendChild(orderitem);
      }
  }



}

function autocomplete(inp, arr) {
                /*the autocomplete function takes two arguments,
                the text field element and an array of possible autocompleted values:*/
                var currentFocus;
                /*execute a function when someone writes in the text field:*/
                inp.addEventListener("input", function(e) {
                    var a, b, i, val = this.value;
                    /*close any already open lists of autocompleted values*/
                    closeAllLists();
                    if (!val) { return false;}
                    currentFocus = -1;
                    /*create a DIV element that will contain the items (values):*/
                    a = document.createElement("DIV");
                    a.setAttribute("id", this.id + "autocomplete-list");
                    a.setAttribute("class", "autocomplete-items");
                    /*append the DIV element as a child of the autocomplete container:*/
                    this.parentNode.appendChild(a);
                    /*for each item in the array...*/
                    for (i = 0; i < arr.length; i++) {
                      /*check if the item starts with the same letters as the text field value:*/
                      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                            b.addEventListener("click", function(e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                      }
                    }
                });
                /*execute a function presses a key on the keyboard:*/
                inp.addEventListener("keydown", function(e) {
                    var x = document.getElementById(this.id + "autocomplete-list");
                    if (x) x = x.getElementsByTagName("div");
                    if (e.keyCode == 40) {
                      /*If the arrow DOWN key is pressed,
                      increase the currentFocus variable:*/
                      currentFocus++;
                      /*and and make the current item more visible:*/
                      addActive(x);
                    } else if (e.keyCode == 38) { //up
                      /*If the arrow UP key is pressed,
                      decrease the currentFocus variable:*/
                      currentFocus--;
                      /*and and make the current item more visible:*/
                      addActive(x);
                    } else if (e.keyCode == 13) {
                      /*If the ENTER key is pressed, prevent the form from being submitted,*/
                      e.preventDefault();
                      if (currentFocus > -1) {
                        /*and simulate a click on the "active" item:*/
                        if (x) x[currentFocus].click();
                      }
                    }
                });
                function addActive(x) {
                  /*a function to classify an item as "active":*/
                  if (!x) return false;
                  /*start by removing the "active" class on all items:*/
                  removeActive(x);
                  if (currentFocus >= x.length) currentFocus = 0;
                  if (currentFocus < 0) currentFocus = (x.length - 1);
                  /*add class "autocomplete-active":*/
                  x[currentFocus].classList.add("autocomplete-active");
                }
                function removeActive(x) {
                  /*a function to remove the "active" class from all autocomplete items:*/
                  for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                  }
                }
                function closeAllLists(elmnt) {
                  /*close all autocomplete lists in the document,
                  except the one passed as an argument:*/
                  var x = document.getElementsByClassName("autocomplete-items");
                  for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                  }
                }
              }
              /*execute a function when someone clicks in the document:*/
              document.addEventListener("click", function (e) {
                  closeAllLists(e.target);
              });
              }
              
function plusItem(id){
  //loop through local storage cart
  var current_cart = JSON.parse(localStorage.getItem('cart'));
  console.log(current_cart)
  console.log(id)
  var found = false;
  for(var i = 0; i < current_cart.length; i++){
      if(current_cart[i].id == id){
          //update local storage
          current_cart[i].qty++;
          found = true;
          localStorage.setItem('cart', JSON.stringify(current_cart));
          var itemcount = document.getElementById(`itemcount_${id}`);
          itemcount.innerHTML = current_cart[i].qty;
          var cartnum = document.getElementById('cartnum');
          plusone = cartnum.innerText + 1;
          cartnum.innerText = plusone;
      }
  }
}

function minusItem(id){
  //loop through local storage cart
  var current_cart = JSON.parse(localStorage.getItem('cart'));
  var found = false;
  for(var i = 0; i < current_cart.length; i++){
      if(current_cart[i].id == id){
          //update local storage
          current_cart[i].qty--;
          found = true;
          localStorage.setItem('cart', JSON.stringify(current_cart));
          var itemcount = document.getElementById(`itemcount_${id}`);
          itemcount.innerHTML = current_cart[i].qty;

          var cartnum = document.getElementById('cartnum');
          minusone = cartnum.innerText - 1;
          cartnum.innerText = minusone;
        


          if (current_cart[i].qty == 0){
              document.getElementById(`${id}_order`).remove();
              
              //remove current_cart[i] from current_cart
              current_cart.splice(i, 1);
              localStorage.setItem('cart', JSON.stringify(current_cart));
              //remove item from cart
              //remove the html element 
              
          }
      }
  }
}
//const

const allItems = document.getElementById("all");
const allSnacks = document.getElementById("snacks");
const allNoodles = document.getElementById("noodles");
const allRicebowl = document.getElementById("ricebowl");
const allDrinks = document.getElementById("drinks");
const clear = document.getElementById("clear");
const dorms_list = ["Fenwick", "66 Commonwealth Avenue", "Cheverus", "Claver", "Cushing", "Duchesne", "Fitzpatrick",
"Gabelli", "Gonzaga", "Greycliff", "Hardey", "Ignacio", "Keyes", "Kostka", "Loyola", "Medeiros",
"Mods", "Ninety St. Thomas More", "2k", "Roncalli", "Rubenstein", "Shaw", "Stayer", "Thomas More Apartments",
"2150", "Vanderslice", "Voute", "Walsh", "Welch", "Williams", "Xavier" ]

autocomplete(document.getElementById("dorm"), dorms_list);

body = document.getElementsByTagName("body");
body[0].onload = query_items();

clear.addEventListener("click", function(){
  //clear cart in local storage
  localStorage.removeItem('cart');
  //clear id="ordercontainer"
  var ordercontainer = document.getElementById("ordercontainer");
  ordercontainer.innerHTML = "";
})

//add eventlistener to all
allItems.addEventListener("click", function(){
  allItems.classList.add('active');
  allSnacks.classList.remove('active');
  allNoodles.classList.remove('active');
  allRicebowl.classList.remove('active');
  allDrinks.classList.remove('active');
  getCategory("all");
});
allSnacks.addEventListener("click", function(){
  allItems.classList.remove('active');
  allSnacks.classList.add('active');
  allNoodles.classList.remove('active');
  allRicebowl.classList.remove('active');
  allDrinks.classList.remove('active');
  getCategory("snacks");
});
allNoodles.addEventListener("click", function(){
  allItems.classList.remove('active');
  allSnacks.classList.remove('active');
  allNoodles.classList.add('active');
  allRicebowl.classList.remove('active');
  allDrinks.classList.remove('active');
  getCategory("noodles");
});
allRicebowl.addEventListener("click", function(){
  allItems.classList.remove('active');
  allSnacks.classList.remove('active');
  allNoodles.classList.remove('active');
  allRicebowl.classList.add('active');
  allDrinks.classList.remove('active');
  getCategory("ricebowl");
});
allDrinks.addEventListener("click", function(){
  allItems.classList.remove('active');
  allSnacks.classList.remove('active');
  allNoodles.classList.remove('active');
  allRicebowl.classList.remove('active');
  allDrinks.classList.add('active');
  getCategory("drinks");
});

const mainlogin = document.getElementById("mainlogin");
mainlogin.addEventListener("click", function(){
  document.getElementById("loginmodal").className = "user-modal is-visible";
  //click on sign in tab
  document.getElementById("tab-signin").click();
});