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

    $("#paysub").click(function() {
      var pname = $("#payname").val();
      var pemail = $("#payemail").val();
      var pnum = $("#paynum").val();
      var don = $("#payamount").val();
      if(pemail === "" || pname === "" || pnum === "" || don === "") { alert("All fields are mandatory!"); }
      else if(ValidateEmail(pemail)) {}
      else if(pnum < 6000000000 || pnum > 9999999999) { alert("Please enter valid mobile number!"); }
      else {
        $('#myModal').modal('hide');
        var options = {
            "key": "rzp_test_PpOinqLyVBHOcP", // Enter the Key ID generated from the Dashboard
            "amount": don*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or ₹500.
            "currency": "INR",
            "name": "Charity Donation",
            "description": "Hackathon",
            "image": "logo.png",// Replace this with the order_id created using Orders API (https://razorpay.com/docs/api/orders).
            "handler": function (response){
              console.log(response);
              db.collection("donations").doc().set({
                name: pname,
                email: pemail,
                mobile: pnum,
                amount: don,
                payment_id: response.razorpay_payment_id
              }).then(function() {
                alert("Your Payment is Successfull! Kindly check your Email/Mobile for details.");
              });                
            },
            "prefill": {
                "name": pname,
                "email": pemail,
                "contact": pnum
            },
            "notes": {
                "address": "note value"
            },
            "theme": {
                "color": "#9932CC"
            }
        }
        var propay = new Razorpay(options);
        propay.open();
      }
  });

  $("#colsub").click(function() {
    var colname = $("#colname").val();
    var colemail = $("#colemail").val();
    var colnum = $("#colnum").val();
    var reason = $("#reason").val();
    if(colemail === "" || colname === "" || colnum === "" || reason === "") { alert("All fields are mandatory!"); }
    else if(ValidateEmail(colemail)) {}
    else if(colnum < 6000000000 || colnum > 9999999999) { alert("Please enter valid mobile number!"); }
    else if(reason.length < 100) { alert("Please mention reason is atleast 100 characters!"); }
    else {
      db.collection("collectReq").doc().set({
        name: colname,
        email: colemail,
        mobile: colnum,
        reason: reason,
        emergency: $("input[name='emer']:checked").attr('id')
      }).then(function() {
        $('#myModal2').modal('hide');
        alert("Collect Request successfully received! We will contact you soon.");
      });  
    }
  });

})