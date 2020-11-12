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

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("Signed in");
          tabledata();
        } else {
          // User is signed out.
          window.open("login.html","_self");
        }
    });

    logout=()=> {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.open("index.html","_self");
        }).catch(function(error) {
            // An error happened.
        });
    }

    $("#refresh").click(function() {
        $("#tableid").empty();
        tabledata();
    });

    tabledata=()=> {
        db.collection("donations").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                docid = doc.id;
                name = doc.data().name;
                email = doc.data().email;
                mobile = doc.data().mobile;
                amount = doc.data().amount;
                data = `<tr data-id=${docid} data-col="donations"><td><input class="c" type="checkbox" /><td>${name}</td><td>${mobile}</td><td>${email}</td><td>₹${amount}</td><td>Donation</td></tr>`;
                $(data).appendTo("#tableid");
            });
        });

        db.collection("collectReq").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                docid = doc.id;
                name = doc.data().name;
                email = doc.data().email;
                mobile = doc.data().mobile;
                amount = doc.data().amount;
                if(doc.data().emergency === "Yes") { emer = "Emergency"; }
                else { emer = "Normal"; }
                data = `<tr data-id=${docid} data-col="collectReq"><td><input class="c" type="checkbox" /><td>${name}</td><td>${mobile}</td><td>${email}</td><td>₹${amount}</td><td>Collection (${emer})</td></tr>`;
                $(data).appendTo("#tableid");
            });
        });
    }
    
    delete_data=()=> {
        let t = document.getElementById("tableid");
        let n = t.getElementsByClassName("c");
        for(let i=0 ; i<n.length ; i++)
        {
            if(n[i].checked)
            {
                let id = n[i].parentNode.parentNode.getAttribute('data-id');
                let col = n[i].parentNode.parentNode.getAttribute('data-col');
                db.collection(col).doc(id).delete().then(function() {
                    console.log("Document successfully deleted!");
                    tableid.deleteRow(i);
                    i--;
                    n.length--;
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            }
        }
    }

    edit_data=()=>{
        let t = document.getElementById("tableid");
        let n = t.getElementsByClassName("c");
        let count=0;
        for(let i=0 ; i<n.length ; i++)
        {
            if(n[i].checked) { count++; }
        }
        if(count < 1) { alert("Please select an entry to edit"); }
        else if(count > 1) { alert("Edit only 1 entry at a time!"); }
        else {
            for(let i=0 ; i<n.length ; i++)
            {
                if(n[i].checked)
                {
                    let id = n[i].parentNode.parentNode.getAttribute('data-id');
                    let col = n[i].parentNode.parentNode.getAttribute('data-col');
                    const name = document.getElementById("name1").value;
                    const num = document.getElementById("number1").value;
                    const email = document.getElementById("email1").value;
                    if(email === "" || name === "" || num === "") { alert("All fields are mandatory!"); }
                    else if(ValidateEmail(email)) {}
                    else if(num < 6000000000 || num > 9999999999) { alert("Please enter valid mobile number!"); }
                    else {
                        db.collection(col).doc(id).set({
                            name: name,
                            email: email,
                            mobile: num,
                        }, { merge: true }).then(function() {
                            const amount = n[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerText.replace(/[^0-9]/g,'');;
                            const type = n[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerText;
                            let data= `<tr><td><input class="c" type="checkbox" /><td>${name}</td><td>${num}</td><td>${email}</td><td>₹${amount}</td><td>${type}</td></tr>`;
                            t.deleteRow(i);
                            $(data).appendTo("#tableid");
                        });
                    }   
                }
            }
        }
    }

    function ValidateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return(false);
        }
        alert("You have entered an invalid email address!");
        return(true);
    }
})