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