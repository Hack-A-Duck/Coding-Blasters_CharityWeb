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
        let t=document.getElementById("tableid");
        let n=t.getElementsByClassName("c");
        for(let i=0;i<=n.length;i++)
        {
            if(n[i].checked)
            {
                let rows = "";
                const name=document.getElementById("name1").value;
                const roll=document.getElementById("rollno1").value;
                const year=document.getElementById("year1").value;
                const stream=document.getElementById("stream1").value;
                rows += `<tr><td><input class="c" type="checkbox" /><td>${roll}</td><td>${name}</td><td>${year}</td><td>${stream}</td></tr>`;
                t.deleteRow(i);
                $(rows).appendTo("#tableid");
                
            }
        }
    }
})