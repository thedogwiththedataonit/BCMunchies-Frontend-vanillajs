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

// GOOGLE

//when loginbtn is clicked, grab signin-email and signin-password
//add eventlistener to loginbtn
//when loginbtn is clicked, grab signin-email and signin-password
//add eventlistener to loginbtn

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


//onload, wait for function call to /menu 

body = document.getElementsByTagName("body");
body[0].onload = function(){
  fetch("/api/menu").then(function(response){
    return response.json();
  }
  ).then(function(data){
    console.log(data);

    //for length in data, create a label 
    
    for(var i = 0; i < data.length; i++){
      var label = document.createElement("label");
      label.setAttribute("for", `t-${i+1}`);
      label.setAttribute("class", "item");
      label.setAttribute("id", data[i].id);

      label.innerHTML = `<img src="/static/img/${data[i].img}"/><p>${data[i].name}</p><a class="bttn-two" onclick="addtocart('${data[i].id}')">Add</a>`;

      //append label to menu
      document.getElementById("menu").appendChild(label);
    }
    
  }
  ).catch(function(error){
    console.log(error);
  });

  var current_cart = localStorage.getItem('cart');
  console.log(current_cart);
  var cartnum = document.getElementById("cartnum");
  if(current_cart == null){
    cartnum.innerText = 0;
    return 0;
  }
  else{
    current_cart = JSON.parse(current_cart);
    var cartvaluenum = 0;
    for(var i = 0; i < current_cart.length; i++){
      cartvaluenum += current_cart[i].qty;
    }
    cartnum.innerText = cartvaluenum;
    return cartvaluenum;
  }
}


const mainlogin = document.getElementById("mainlogin");
mainlogin.addEventListener("click", function(){
  document.getElementById("loginmodal").className = "user-modal is-visible";
  //click on sign in tab
  document.getElementById("tab-signin").click();
}
);

function addtocart(id){
  var current_cart = localStorage.getItem('cart');

  var cartnum = document.getElementById("cartnum");
  cartnum.innerText = parseInt(cartnum.innerText) + 1;

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
  }
  else{
    current_cart = JSON.parse(current_cart);
    var found = false;
    for(var i = 0; i < current_cart.length; i++){
      if(current_cart[i].id == id){
        current_cart[i].qty++;
        found = true;
        localStorage.setItem('cart', JSON.stringify(current_cart));
      }
    }
    if(!found){
      current_cart.push({'id': id, 'qty': 1});
      localStorage.setItem('cart', JSON.stringify(current_cart));
    }

  }
  
}

