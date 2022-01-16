var host = localhost;
var port = 80;

function clear() {
    console.log("clearing");
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:80/clear", true);
    //route through content type
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //sent data for variable
    xhttp.send("request=clear");
    console.log("cleared");
}
