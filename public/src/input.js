var ID;
var choice;

function getIDValue() {
    ID = document.getElementById("IDnum").value;
    document.getElementById("IDnum").value = "";
    //check format x00
    //if (ID.match(/^[a-z]{1}\d{2}$/i)) {
    //check format 000
    if (ID.match(/^\d{1,3}$/m)) {
        document.getElementById("ID_input").style.display = "none";
        document.getElementById("choice_input").style.display = "inline";
        document.getElementById("choices").style.display = "none";
        document.getElementById("choices").style.display = "inline";
    } else {
        console.log("inncorrect value!");
    }
}

function getChoice() {
    let options = document.getElementsByName("choice");
    for (let i of options) {
        if (i.checked) {
            choice = i.value;
            i.checked = false;
            document.getElementById("choice_input").style.display = "none";
            document.getElementById("ID_input").style.display = "inline";

            save();
        }
    }
}

function save() {
    //convert inputs to JSON object
    let obj = {
        id: ID,
        choice: choice,
    };

    //POST request to sever to send data
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:80/add", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    //sent data for variable
    xhttp.send(JSON.stringify(obj));
}
