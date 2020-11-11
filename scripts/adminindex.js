input_data=()=> {

        const i=1;
        let rows = "";
        const name = document.getElementById("name").value;
        const roll = document.getElementById("number").value;
        const year = document.getElementById("email").value;
        const stream = document.getElementById("amount").value;
		const type= document.getElementById("type").value;
        
        if(name == null || /[^a-zA-Z]/.test(name))
                alert("Enter correct Name");
        else if( roll == null || /[^0-9]/.test(roll))
                alert("Enter correct roll number");
        else if(year == null || /[^0-9]/.test(year))
                alert("Enter correct Year");
        else if( stream == null || /[^a-zA-Z]/.test(stream))
                alert("Enter correct Stream");
        else if(name!= null && name.trim() !== '' && roll!= null && roll.trim() !== '' && year!= null && year.trim() !== '' && stream!= null && stream.trim() !== '')
        {
            rows += `<tr><td><input class="c" type="checkbox" /><td>${roll}</td><td>${name}</td><td>${year}</td><td>${stream}</td><td>${type}</td></tr>`;
            $(rows).appendTo("#tableid");
        }
        else 
        {
            alert("Donot leave any field empty");
            alert("Enter Details of Student");
        }

        document.getElementById("rollno").value = "";
        document.getElementById("name").value = "";
        document.getElementById("year").value = "";
        document.getElementById("stream").value = "";
		   document.getElementById("type).value = "";
    }
    delete_data=()=> {
        let t=document.getElementById("tableid");
        let n=t.getElementsByClassName("c");
        for(let i=0;i<=n.length;i++)
        {
            if(n[i].checked)
            {
                tableid.deleteRow(i);
                i--;
                n.length--;
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
