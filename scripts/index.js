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
    var db = firebase.firestore();

    $(document).ready(function(){
      // Add smooth scrolling to all links in navbar + footer link
      $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
    
          // Store hash
          var hash = this.hash;
    
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 900, function(){
       
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
      
      $(window).scroll(function() {
        $(".slideanim").each(function(){
          var pos = $(this).offset().top;
    
          var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
              $(this).addClass("slide");
            }
        });
      });
    })

    $("#send").click(function() {
      var name = $("#name").val();
      var email = $("#email").val();
      var comments = $("#comments").val();
      if(email === "" || name === "" || comments === "") { alert("All fields are mandatory!"); }
      else if(ValidateEmail(email)) {}
      else if(comments.length < 50) { alert("Please enter atleast 50 characters!"); }
      else {
        db.collection("contactus").doc().set({
          name: name,
          email: email,
          comments: comments
        }).then(function() {
          alert("Your Query is sent Successfully! We will contact you soon.");
        });
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