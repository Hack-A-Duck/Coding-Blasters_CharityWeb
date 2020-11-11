$(document).ready(function(){

    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAALA5fAV_gRE54KuvildKoFmcnm6OqDK4",
      authDomain: "charity-website-hackaduck.firebaseapp.com",
      databaseURL: "https://charity-website-hackaduck.firebaseio.com",
      projectId: "charity-website-hackaduck",
      storageBucket: "charity-website-hackaduck.appspot.com",
      messagingSenderId: "562730062248",
      appId: "1:562730062248:web:c1a7c5e41c348568118d9d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    $(".btn").click(function() {
        var email = $("#email").val();
        var pass = $("#pass").val();
        if(ValidateEmail(email)) {}
        else {
            firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                if (errorCode === "auth/user-not-found") {
                    alert("Invalid Email and/or Password!");
                }
            });
        }
      });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("Signed in");
          window.open("adminindex.html","_self");
        } else {
          // User is signed out.
          // ...
        }
    });

    function ValidateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return(false);
        }
        alert("You have entered an invalid email address!");
        return(true);
      }
})