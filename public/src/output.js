function getIDValue() {
    let ID = document.getElementById("IDnum").value;
    document.getElementById("IDnum").value = "";
    //check format x00
    //if (ID.match(/^[a-z]{1}\d{2}$/i)) {
    //check format 000
    if (ID.match(/^\d{1,3}$/m)) {
        document.getElementById("ID_input").style.display = "none";
        read(ID);
        // display cards
    } else {
        console.log("inncorrect value!");
    }
}

//get info from json
function read(ID) {
    //convert inputs to JSON object
    let obj = {
        id: ID,
    };  

    //POST request to sever to send data
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/output", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    //sent data for variable
    xhttp.send(JSON.stringify(obj));

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && !xhttp.status) {
            console.log("failed to communicate with server");
        } else if (xhttp.readyState === 4 && xhttp.status === 200) {
            let response = JSON.parse(xhttp.response);
            if (document.getElementById("error")) {
                let e = document.getElementById("error");
                e.parentNode.removeChild(e);
            }
            if (response.error === 1) {
                console.log("error: user not stored");
                document.getElementById("ID_input").style.display = "inline";
                //create error message
                let err = document.createElement("P");
                err.setAttribute("id", "error");
                err.innerText = "error: ID number not found";
                document.body.appendChild(err);
            } else {
                setTimeout(function () {
                    window.location.reload();
                }, 10000);
                let contain = document.getElementById("container");
                if (response.result === 1) {
                    let win = document.createElement("IMG");
                    win.setAttribute("id", "win");
                    win.src = `../bin/win/${response.choice}_win.gif`;
                    contain.appendChild(win);
                } else {
                    let lose = document.createElement("IMG");
                    lose.setAttribute("id", "lose");
                    lose.src = `../bin/lose/${response.choice}_lose.gif`;
                    contain.appendChild(lose);
                }
            }
        }
    };
}
